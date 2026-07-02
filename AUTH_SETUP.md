# Better Auth Setup Guide

## Installation

```bash
npm install better-auth resend
```

## Environment Variables

Add to your `.env` file:

```env
# Better Auth
BETTER_AUTH_SECRET="your-secret-key-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"

# Resend (for email verification)
RESEND_API_KEY="your-resend-api-key"
```

### Get Resend API Key:
1. Go to https://resend.com
2. Sign up for free account (100 emails/day free)
3. Verify your domain or use their test domain
4. Get API key from dashboard
5. Add to `.env`

## Database Setup

Run migrations:

```bash
npx prisma generate
npx prisma db push
```

## Create First Admin User

After setting up, you'll need to manually set the first admin user in the database:

```sql
-- Sign up normally first, then update the role
UPDATE users SET role = 'admin' WHERE email = 'your-admin@email.com';
```

Or use Prisma Studio:
```bash
npx prisma studio
```

## Features Implemented

### ✅ Email/Password Authentication
- Sign up with email verification
- Sign in
- Password requirements (min 8 characters)
- Session management (7 days)

### ✅ Email Verification
- Automatic email sent on signup
- Beautiful HTML email template
- Auto sign-in after verification
- Resend integration

### ✅ Role-Based Access Control
- **Admin**: Full access to admin panel
- **Member**: Access to member features
- Middleware protection for admin routes

### ✅ Protected Routes
- `/admin/*` - Admin only
- Automatic redirect to sign-in
- Redirect back after login

## Routes

### Auth Pages
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- `/auth/forgot-password` - Password reset (to be implemented)

### API Routes
- `/api/auth/*` - All auth endpoints handled by Better Auth

## Usage in Components

```typescript
import { useSession, signOut } from '@/lib/auth-client';

function MyComponent() {
  const { data: session, isPending } = useSession();
  
  if (isPending) return <div>Loading...</div>;
  
  if (!session) {
    return <Link href="/auth/signin">Sign In</Link>;
  }
  
  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

## Server-Side Auth

```typescript
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Check role
  if (session.user.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }
  
  // Your logic here
}
```

## Email Configuration

### Development
Use Resend's test domain for development:
- From: `onboarding@resend.dev`
- Emails sent to your verified email only

### Production
1. Verify your domain in Resend
2. Add DNS records
3. Update `from` address in `src/lib/auth.ts`
4. Update `BETTER_AUTH_URL` to production URL

## Security Best Practices

### Generate Secure Secret
```bash
openssl rand -base64 32
```

### Production Checklist
- [ ] Change `BETTER_AUTH_SECRET` to secure random string
- [ ] Update `BETTER_AUTH_URL` to production domain
- [ ] Verify domain in Resend
- [ ] Enable HTTPS
- [ ] Set secure cookie settings
- [ ] Add rate limiting
- [ ] Enable CORS properly

## Customization

### Email Template
Edit in `src/lib/auth.ts`:
```typescript
sendVerificationEmail: async ({ user, url }) => {
  // Customize your email here
}
```

### Session Duration
Edit in `src/lib/auth.ts`:
```typescript
session: {
  expiresIn: 60 * 60 * 24 * 7, // 7 days
  updateAge: 60 * 60 * 24, // 1 day
}
```

### User Roles
Add more roles in Prisma schema and update middleware logic.

## Troubleshooting

### Emails not sending?
- Check Resend API key
- Verify email domain
- Check Resend dashboard for errors
- In development, use test domain

### Session not persisting?
- Check cookie settings
- Verify `BETTER_AUTH_URL` matches your domain
- Clear browser cookies and try again

### Admin access denied?
- Verify user role in database
- Check middleware logic
- Clear session and sign in again

## Next Steps

1. Install packages: `npm install better-auth resend`
2. Get Resend API key
3. Update `.env` with keys
4. Run `npx prisma db push`
5. Test signup flow
6. Create admin user
7. Test admin access

## Support

Better Auth Docs: https://better-auth.com
Resend Docs: https://resend.com/docs
