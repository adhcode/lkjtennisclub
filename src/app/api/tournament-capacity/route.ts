'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Tournament capacity limits
const TOURNAMENT_CAPACITY = {
    men: 16,
    women: 2,
    kids: 6
};

export async function GET() {
    try {
        // Get current registration counts for each category
        const [menCount, womenCount, kidsCount] = await Promise.all([
            prisma.tournamentRegistration.count({
                where: {
                    category: 'men',
                    status: { not: 'cancelled' }
                }
            }),
            prisma.tournamentRegistration.count({
                where: {
                    category: 'women',
                    status: { not: 'cancelled' }
                }
            }),
            prisma.tournamentRegistration.count({
                where: {
                    category: 'kids',
                    status: { not: 'cancelled' }
                }
            })
        ]);

        const capacityData = {
            men: {
                registered: menCount,
                capacity: TOURNAMENT_CAPACITY.men,
                remaining: TOURNAMENT_CAPACITY.men - menCount,
                isFull: menCount >= TOURNAMENT_CAPACITY.men
            },
            women: {
                registered: womenCount,
                capacity: TOURNAMENT_CAPACITY.women,
                remaining: TOURNAMENT_CAPACITY.women - womenCount,
                isFull: womenCount >= TOURNAMENT_CAPACITY.women
            },
            kids: {
                registered: kidsCount,
                capacity: TOURNAMENT_CAPACITY.kids,
                remaining: TOURNAMENT_CAPACITY.kids - kidsCount,
                isFull: kidsCount >= TOURNAMENT_CAPACITY.kids
            }
        };

        return NextResponse.json(capacityData);
    } catch (error) {
        console.error('Error fetching tournament capacity:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tournament capacity' },
            { status: 500 }
        );
    }
} 