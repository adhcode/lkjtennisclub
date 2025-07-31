import type { Metadata } from "next";
import { Inter, Bruno_Ace_SC, Raleway } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const bruno = Bruno_Ace_SC({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bruno',
});
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-raleway',
});



export const metadata: Metadata = {
  title: "LKJ Tennis Club",
  description: "Join our exclusive tennis community and elevate your game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${bruno.variable} ${raleway.variable}`}>
        {children}
      </body>
    </html>
  );
}
