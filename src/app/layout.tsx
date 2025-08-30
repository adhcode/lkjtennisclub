import { Inter, Raleway } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const agrandir = localFont({
  src: [
    {
      path: '../../public/fonts/Agrandir-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Agrandir-TextBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Agrandir-GrandHeavy.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-agrandir',
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: '--font-raleway',
});

export const metadata = {
  title: "LKJ Tennis Club",
  description: "Tennis, community, and everything in between ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${agrandir.variable} ${raleway.variable}`}>
        {children}
      </body>
    </html>
  );
}
