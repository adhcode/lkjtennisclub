'use client';

import Link from 'next/link';
import { Bruno_Ace_SC, Raleway } from 'next/font/google';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://instagram.com',
        icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    },
    {
        name: 'X (Twitter)',
        href: 'https://x.com',
        icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    },
    {
        name: 'TikTok',
        href: 'https://tiktok.com',
        icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    },
    {
        name: 'Facebook',
        href: 'https://facebook.com',
        icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
        </svg>
    }
];

const Footer = () => {
    return (
        <footer className="bg-[#911b1e] text-[#fcf7dc]">
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h3 className={`text-2xl tracking-wider ${brunoAce.className}`}>
                            LKJ TENNIS
                        </h3>
                        <p className={`text-sm text-[#fcf7dc]/70 max-w-xs ${raleway.className}`}>
                            Where tennis brings people together, enriching lives through sport and community.
                        </p>
                        <div className="flex space-x-6">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="text-[#fcf7dc]/60 hover:text-[#fcf7dc] transition-colors duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={`text-lg mb-6 ${brunoAce.className}`}>Quick Links</h4>
                        <ul className={`space-y-4 text-sm text-[#fcf7dc]/70 ${raleway.className}`}>
                            <li><Link href="#" className="hover:text-[#fcf7dc]">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#fcf7dc]">Membership</Link></li>
                            <li><Link href="#" className="hover:text-[#fcf7dc]">Events</Link></li>
                            <li><Link href="#" className="hover:text-[#fcf7dc]">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className={`text-lg mb-6 ${brunoAce.className}`}>Contact</h4>
                        <ul className={`space-y-4 text-sm text-[#fcf7dc]/70 ${raleway.className}`}>
                            <li>LKJ Gardens, Igando</li>
                            <li>Lagos, Nigeria</li>
                            <li>hello@lkjtennis.org</li>
                            <li>+234 8061230727</li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className={`text-lg mb-6 ${brunoAce.className}`}>Opening Hours</h4>
                        <ul className={`space-y-4 text-sm text-[#fcf7dc]/70 ${raleway.className}`}>
                            <li>Monday - Friday</li>
                            <li>6:00 AM - 9:00 PM</li>
                            <li>Saturday - Sunday</li>
                            <li>7:00 AM - 8:00 PM</li>
                        </ul>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <h3 className={`text-[#fcf7dc] text-lg mb-4 ${brunoAce.className}`}>Location</h3>
                        <p className={`text-[#fcf7dc]/70 ${raleway.className}`}>
                            LKJ Tennis Club
                            <br />
                            LKJ Gardens Estate
                            <br />
                            Igando, Lagos
                        </p>
                    </div>
                </div>

                {/* Bottom Bar with Made with Love */}
                <div className="border-t border-[#fcf7dc]/10 mt-16 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className={`text-sm text-[#fcf7dc]/40 ${raleway.className}`}>
                            © 2024 LKJ Tennis Club. All rights reserved.
                        </p>
                        <div className={`flex items-center space-x-6 text-sm text-[#fcf7dc]/40 ${raleway.className}`}>
                            <Link href="#" className="hover:text-[#fcf7dc] transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:text-[#fcf7dc] transition-colors duration-300">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <p className={`text-sm text-[#fcf7dc]/40 ${raleway.className}`}>
                            made with{' '}
                            <span className="text-red-500 animate-pulse">❤</span>
                            {' '}by{' '}
                            <Link
                                href="https://www.instagram.com/uvise.ng/"
                                className="text-[#fcf7dc]/60 hover:text-[#fcf7dc] transition-colors duration-300"
                            >
                                uvise
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 