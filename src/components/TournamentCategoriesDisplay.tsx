'use client';

import { useState, useEffect } from 'react';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

interface CapacityData {
    men: { registered: number; capacity: number; remaining: number; isFull: boolean };
    women: { registered: number; capacity: number; remaining: number; isFull: boolean };
    kids: { registered: number; capacity: number; remaining: number; isFull: boolean };
}

const TournamentCategoriesDisplay = () => {
    const [capacityData, setCapacityData] = useState<CapacityData | null>(null);

    useEffect(() => {
        const fetchCapacity = async () => {
            try {
                const response = await fetch('/api/tournament-capacity');
                if (response.ok) {
                    const data = await response.json();
                    setCapacityData(data);
                }
            } catch (error) {
                console.error('Error fetching capacity:', error);
            }
        };

        fetchCapacity();
        // Refresh every 30 seconds
        const interval = setInterval(fetchCapacity, 30000);
        return () => clearInterval(interval);
    }, []);

    const getStatusText = (category: { remaining: number; capacity: number; isFull: boolean }) => {
        if (category.isFull) {
            return 'FULL';
        }
        return `${category.remaining} spots left`;
    };

    const getStatusColor = (category: { remaining: number; capacity: number; isFull: boolean }) => {
        if (category.isFull) {
            return 'text-red-600';
        }
        if (category.remaining <= 2) {
            return 'text-orange-600';
        }
        return 'text-[#911b1e]/70';
    };

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/70 rounded-lg p-6 border border-[#911b1e]/10 text-center">
                <h3 className={`text-[#911b1e] text-lg mb-2 ${raleway.className}`}>
                    Men's Category
                </h3>
                <p className={`mb-3 text-sm ${raleway.className} ${capacityData ? getStatusColor(capacityData.men) : 'text-[#911b1e]/70'}`}>
                    {capacityData ? getStatusText(capacityData.men) : '16 spots available'}
                </p>
            </div>

            <div className="bg-white/70 rounded-lg p-6 border border-[#911b1e]/10 text-center">
                <h3 className={`text-[#911b1e] text-lg mb-2 ${raleway.className}`}>
                    Women's Category
                </h3>
                <p className={`mb-3 text-sm ${raleway.className} ${capacityData ? getStatusColor(capacityData.women) : 'text-[#911b1e]/70'}`}>
                    {capacityData ? getStatusText(capacityData.women) : '2 spots available'}
                </p>
            </div>

            <div className="bg-white/70 rounded-lg p-6 border border-[#911b1e]/10 text-center">
                <h3 className={`text-[#911b1e] text-lg mb-2 ${raleway.className}`}>
                    Kids Category
                </h3>
                <p className={`mb-3 text-sm ${raleway.className} ${capacityData ? getStatusColor(capacityData.kids) : 'text-[#911b1e]/70'}`}>
                    {capacityData ? getStatusText(capacityData.kids) : '6 spots available'}
                </p>
            </div>
        </div>
    );
};

export default TournamentCategoriesDisplay; 