'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface CapacityData {
    men: { registered: number; capacity: number; remaining: number; isFull: boolean };
    women: { registered: number; capacity: number; remaining: number; isFull: boolean };
    kids: { registered: number; capacity: number; remaining: number; isFull: boolean };
}

const TournamentCapacityDisplay = () => {
    const [capacityData, setCapacityData] = useState<CapacityData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCapacity = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/tournament-capacity');
            if (response.ok) {
                const data = await response.json();
                setCapacityData(data);
            }
        } catch (error) {
            console.error('Error fetching capacity:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCapacity();
        // Refresh every 30 seconds
        const interval = setInterval(fetchCapacity, 30000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center gap-8 text-sm text-[#911b1e]/70">
                <span>Loading capacity...</span>
            </div>
        );
    }

    if (!capacityData) {
        return (
            <div className="flex justify-center gap-8 text-sm text-[#911b1e]/70">
                <span>Men: 16 spots</span>
                <span>Women: 2 spots</span>
                <span>Kids: 6 spots</span>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-3">
                <div className="flex gap-6 text-sm">
                    <span className={`${capacityData.men.isFull ? 'text-red-600' : 'text-[#911b1e]/70'}`}>
                        Men: {capacityData.men.remaining}/{capacityData.men.capacity} left
                    </span>
                    <span className={`${capacityData.women.isFull ? 'text-red-600' : 'text-[#911b1e]/70'}`}>
                        Women: {capacityData.women.remaining}/{capacityData.women.capacity} left
                    </span>
                    <span className={`${capacityData.kids.isFull ? 'text-red-600' : 'text-[#911b1e]/70'}`}>
                        Kids: {capacityData.kids.remaining}/{capacityData.kids.capacity} left
                    </span>
                </div>
                <button
                    onClick={fetchCapacity}
                    disabled={isLoading}
                    className="text-[#911b1e]/50 hover:text-[#911b1e]/70 transition-colors"
                    title="Refresh capacity"
                >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            {(capacityData.men.isFull || capacityData.women.isFull || capacityData.kids.isFull) && (
                <p className="text-red-600 text-xs">
                    ⚠️ Some categories are full
                </p>
            )}
        </div>
    );
};

export default TournamentCapacityDisplay; 