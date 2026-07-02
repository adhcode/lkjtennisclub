import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * CRITICAL: This script restores members with their EXACT IDs
 * so that printed QR codes continue to work.
 * 
 * INSTRUCTIONS:
 * 1. Fill in the members array below with the exact data
 * 2. Make sure the 'id' field matches what was in the QR codes
 * 3. Run: npx tsx scripts/restore-members-with-ids.ts
 */

const membersToRestore = [
  // EXAMPLE - Replace with your actual member data:
  // {
  //   id: 'clxxxxx', // The exact database ID (if you have it)
  //   membershipId: 'LKJ-2025-001', // The ID in the QR code
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   email: 'john@example.com',
  //   phone: '+234 801 234 5678',
  //   membershipType: 'regular',
  //   membershipStatus: 'active',
  //   joinDate: new Date('2025-01-01'),
  //   expiryDate: new Date('2025-12-31'),
  //   joinedYear: 2025,
  // },
  
  // ADD YOUR MEMBERS HERE:
  // Copy the format above for each member
];

async function restoreMembers() {
  console.log('🔄 Starting member restoration...\n');

  if (membersToRestore.length === 0) {
    console.log('⚠️  No members to restore!');
    console.log('📝 Please edit this file and add your member data.');
    console.log('   Location: scripts/restore-members-with-ids.ts\n');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const member of membersToRestore) {
    try {
      // If we have the exact ID, use it
      if (member.id) {
        const created = await prisma.member.create({
          data: member,
        });
        console.log(`✅ Restored: ${created.firstName} ${created.lastName} (${created.membershipId})`);
        console.log(`   ID: ${created.id}`);
      } else {
        // If we only have membershipId, create without specifying ID
        const { id, ...memberData } = member;
        const created = await prisma.member.create({
          data: memberData,
        });
        console.log(`✅ Created: ${created.firstName} ${created.lastName} (${created.membershipId})`);
        console.log(`   New ID: ${created.id}`);
        console.log(`   ⚠️  QR code will need to be regenerated for this member`);
      }
      successCount++;
    } catch (error: any) {
      console.error(`❌ Failed: ${member.firstName} ${member.lastName}`);
      console.error(`   Error: ${error.message}\n`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Restoration complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log('='.repeat(50) + '\n');
}

restoreMembers()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
