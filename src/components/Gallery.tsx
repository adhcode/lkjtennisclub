'use client';

import { Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

const images = [
    { src: '/about_us2.jpg', size: 'small' },
    { src: '/about_us3.jpg', size: 'small' },
    { src: '/DSC_1853.jpg', size: 'small' },
    { src: '/DSC_1723.jpg', size: 'large' },
    { src: '/DSC_1749.jpg', size: 'tall' },
    { src: '/DSC_1761.jpg', size: 'small' },

    { src: '/DSC_1778.jpg', size: 'small' },
    { src: '/DSC_1781.jpg', size: 'small' },
    { src: '/DSC_1803.jpg', size: 'small' },
    { src: '/DSC_1812.jpg', size: 'small' },
    { src: '/DSC_1814.jpg', size: 'small' },
    { src: '/DSC_1833.jpg', size: 'small' },
    { src: '/DSC_1839.jpg', size: 'small' },


    { src: '/DSC_1758.jpg', size: 'wide' },
    { src: '/DSC_1846.jpg', size: 'small' },
    { src: '/DSC_1861.jpg', size: 'small' },
    { src: '/DSC_1873.jpg', size: 'small' },

    { src: '/DSC_1864.jpg', size: 'small' },
    { src: '/DSC_1876.jpg', size: 'small' },

    { src: '/DSC_1879.jpg', size: 'small' },
    { src: '/DSC_1789.jpg', size: 'small' },
    { src: '/DSC_1858.jpg', size: 'small' },
    { src: '/DSC_1790.jpg', size: 'small' },
    { src: '/DSC_1830.jpg', size: 'small' },
    { src: '/DSC_1852.jpg', size: 'small' },
    { src: '/DSC_1738.jpg', size: 'small' },
    { src: '/DSC_1774.jpg', size: 'small' },
];

const Gallery = () => {
    const [activeImage, setActiveImage] = useState<number | null>(null);

    return (
        <section className="relative py-24 bg-[#911b1e]">
            <div className="absolute top-8 right-4 md:right-6 flex items-center space-x-4">
                <div className="w-12 h-[1px] bg-[#fcf7dc]/40" />
                <span className={`text-[#fcf7dc]/40 text-sm ${raleway.className}`}>Our Moments</span>
                <div className="w-12 h-[1px] bg-[#fcf7dc]/40" />
            </div>
            <div className="container mx-auto px-4 md:px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-[#fcf7dc] text-3xl md:text-4xl mb-16 tracking-wider font-medium font-agrandir"
                >
                    OUR GALLERY
                </motion.h2>

                <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>div:not(:first-child)]:mt-3">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.src}
                            className="relative break-inside-avoid cursor-pointer group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.6,
                                delay: (index % 5) * 0.1,
                                ease: [0.21, 0.47, 0.32, 0.98]
                            }}
                        >
                            <div className={`relative overflow-hidden rounded-2xl
                                ${index % 3 === 0 ? 'aspect-[4/5]' :
                                    index % 3 === 1 ? 'aspect-square' : 'aspect-[4/6]'}`}
                            >
                                <Image
                                    src={image.src}
                                    alt="Tennis Club"
                                    fill
                                    className="object-cover transition-all duration-700 
                                             group-hover:scale-105 filter 
                                             brightness-[0.85] contrast-[1.1] saturate-[0.95]
                                             group-hover:brightness-[0.9]"
                                    onClick={() => setActiveImage(index)}
                                    sizes="(max-width: 768px) 50vw, 
                                           (max-width: 1024px) 33vw,
                                           25vw"
                                />
                                <motion.div
                                    initial={false}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 opacity-0 transition-opacity duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t 
                                                   from-black/50 via-black/20 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            whileHover={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center justify-between"
                                        >
                                            <span className={`text-[#fcf7dc] text-sm ${raleway.className}`}>
                                                View
                                            </span>
                                            <svg
                                                className="w-5 h-5 text-[#fcf7dc]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Full screen preview */}
            {activeImage !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setActiveImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-6xl aspect-[3/2]"
                        transition={{ type: "spring", damping: 25 }}
                    >
                        <Image
                            src={images[activeImage].src}
                            alt="Tennis Club"
                            fill
                            className="object-contain"
                            priority
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveImage(null);
                            }}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full 
                                     flex items-center justify-center hover:bg-white/20 
                                     transition-colors duration-300"
                        >
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className={`text-[#fcf7dc] text-sm ${raleway.className}`}>
                                    {activeImage + 1} of {images.length}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};

export default Gallery; 