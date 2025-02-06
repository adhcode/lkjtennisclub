'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
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
                <h2 className={`text-[#fcf7dc] text-3xl md:text-4xl mb-16 tracking-wider font-medium ${brunoAce.className}`}>
                    OUR GALLERY
                </h2>

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
                                    className="object-cover transition-transform duration-700 
                                             group-hover:scale-105 filter 
                                             brightness-[0.85] contrast-[1.1] saturate-[0.95]
                                             group-hover:brightness-[0.9]"
                                    onClick={() => setActiveImage(index)}
                                    sizes="(max-width: 768px) 50vw, 
                                           (max-width: 1024px) 33vw,
                                           25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t 
                                              from-black/30 via-transparent to-transparent 
                                              opacity-0 group-hover:opacity-100 
                                              transition-opacity duration-500" />
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
                            className="object-contain filter brightness-[0.85] contrast-[1.1] saturate-[0.95]"
                        />
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};

export default Gallery; 