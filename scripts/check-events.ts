import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkEvents() {
  try {
    console.log('🔍 Checking events in database...\n');
    
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        featured: true,
        featuredImage: true,
        startDate: true,
      },
    });
    
    if (events.length === 0) {
      console.log('❌ No events found in database!');
      console.log('\n💡 Run this command to seed events:');
      console.log('   npx tsx scripts/seed-events.ts\n');
    } else {
      console.log(`✅ Found ${events.length} events:\n`);
      events.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        console.log(`   ID: ${event.id}`);
        console.log(`   Slug: ${event.slug}`);
        console.log(`   Status: ${event.status}`);
        console.log(`   Featured: ${event.featured ? 'Yes' : 'No'}`);
        console.log(`   Image: ${event.featuredImage || 'None'}`);
        console.log(`   Date: ${event.startDate.toLocaleDateString()}`);
        console.log('');
      });
      
      console.log('\n📝 To edit events:');
      console.log('   1. Go to http://localhost:3000/admin');
      console.log('   2. Click "Events" in the sidebar');
      console.log('   3. Click the pencil icon next to any event\n');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkEvents();
