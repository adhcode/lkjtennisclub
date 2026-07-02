import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        // Temporarily allow unverified users to sign in while debugging
        // TODO: Uncomment this after email is working
        // if (!user.emailVerified) {
        //   throw new Error('Please verify your email before signing in');
        // }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email!,
          name: user.name,
          role: user.role,
        };
      }
    }),
    // Only add Google if credentials are properly configured
    ...(process.env.GOOGLE_CLIENT_ID && 
        process.env.GOOGLE_CLIENT_ID !== "your-google-client-id" &&
        process.env.GOOGLE_CLIENT_SECRET &&
        process.env.GOOGLE_CLIENT_SECRET !== "your-google-client-secret" ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      
      // Update token when session is updated
      if (trigger === 'update' && session) {
        return { ...token, ...session };
      }
      
      // Fetch fresh user data from database on each request
      if (token.id) {
        const dbUser = await db.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
            address: true,
            city: true,
            state: true,
            postalCode: true,
          },
        });
        
        if (dbUser) {
          token.role = dbUser.role;
          token.phone = dbUser.phone;
          token.address = dbUser.address;
          token.city = dbUser.city;
          token.state = dbUser.state;
          token.postalCode = dbUser.postalCode;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        (session.user as any).phone = token.phone;
        (session.user as any).address = token.address;
        (session.user as any).city = token.city;
        (session.user as any).state = token.state;
        (session.user as any).postalCode = token.postalCode;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
