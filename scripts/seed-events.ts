import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const existingEvents = [
  {
    title: 'DS Energy Tennis Tournament',
    slug: 'ds-energy-tournament',
    description: 'The DS Energy Tennis Tournament is currently underway! This exciting 3-weekend event features three categories: Men, Women, and Kids. Follow the action and cheer on our participants as they compete for the championship!',
    content: `
      <h2>Tournament Details</h2>
      <p>The DS Energy Tennis Tournament is our flagship annual event, bringing together tennis enthusiasts from across the region.</p>
      
      <h3>Categories</h3>
      <ul>
        <li>Men's Singles</li>
        <li>Women's Singles</li>
        <li>Kids Categories</li>
      </ul>
      
      <p>Follow the action and cheer on our participants as they compete for the championship!</p>
    `,
    startDate: new Date('2025-09-06T08:00:00'),
    endDate: new Date('2025-09-20T18:00:00'),
    location: 'LKJ Tennis Club Courts',
    price: 0,
    featuredImage: '/dsenergy2.jpg',
    status: 'published',
    featured: true,
    requiresRegistration: false,
    metaTitle: 'DS Energy Tennis Tournament - LKJ Tennis Club',
    metaDescription: 'The DS Energy Tennis Tournament is currently underway! Follow the action across three categories: Men, Women, and Kids.',
  },
  {
    title: 'Alimosho Summer Tennis Clinic & Tournament',
    slug: 'summer-camp-registration',
    description: 'Our comprehensive 2-week summer program has concluded successfully! The program featured tennis clinic, tournament, plus self-defense, basketball, and badminton activities. Thank you to all participants who made it a memorable experience.',
    content: `
      <h2>Summer Program 2025</h2>
      <p>Our comprehensive 2-week summer program has concluded successfully!</p>
      
      <h3>Program Highlights</h3>
      <ul>
        <li>Tennis clinic and tournament</li>
        <li>Self-defense training</li>
        <li>Basketball activities</li>
        <li>Badminton sessions</li>
      </ul>
      
      <p>Thank you to all participants who made it a memorable experience.</p>
    `,
    startDate: new Date('2025-08-04T09:00:00'),
    endDate: new Date('2025-08-23T16:00:00'),
    location: 'LKJ Tennis Club',
    price: 0,
    featuredImage: '/summerprogram.jpg',
    status: 'published',
    featured: true,
    requiresRegistration: false,
    metaTitle: 'Alimosho Summer Tennis Clinic & Tournament - LKJ Tennis Club',
    metaDescription: 'Comprehensive 2-week summer program featuring tennis clinic, tournament, self-defense, basketball, and badminton activities.',
  },
  {
    title: "Celebrating Prof. Tayo Ajayi's Inaugural Lecture",
    slug: 'prof-tayo-inaugural-lecture',
    description: "We proudly celebrated our esteemed club member, Professor Tayo Julius Ajayi, as he delivered his 109th inaugural lecture at Lagos State University. A proud moment for the LKJ Tennis Club family.",
    content: `
      <h2>A Proud Moment for LKJ Tennis Club</h2>
      <p>We proudly celebrated our esteemed club member, Professor Tayo Julius Ajayi, as he delivered his 109th inaugural lecture at Lagos State University.</p>
      
      <h3>About Prof. Tayo Ajayi</h3>
      <p>Professor Tayo Julius Ajayi is a distinguished member of our tennis club and a respected academic at Lagos State University.</p>
      
      <p>This milestone represents not just his personal achievement, but also reflects the caliber of individuals who are part of the LKJ Tennis Club family.</p>
    `,
    startDate: new Date('2025-07-29T10:00:00'),
    location: 'Lagos State University',
    price: 0,
    featuredImage: '/proftayo.JPG',
    status: 'published',
    featured: true,
    requiresRegistration: false,
    metaTitle: "Celebrating Prof. Tayo Ajayi's Inaugural Lecture - LKJ Tennis Club",
    metaDescription: "We proudly celebrated Professor Tayo Julius Ajayi's 109th inaugural lecture at Lagos State University.",
  },
  {
    title: 'LKJ Tennis Club vs OTA Tennis Club',
    slug: 'lkj-vs-ota-tennis-club',
    description: 'Join us for an exciting friendly competition between LKJ Tennis Club and OTA Tennis Club. Come support our players and enjoy a day of great tennis!',
    content: `
      <h2>Friendly Competition</h2>
      <p>Join us for an exciting friendly competition between LKJ Tennis Club and OTA Tennis Club.</p>
      
      <p>Come support our players and enjoy a day of great tennis!</p>
    `,
    startDate: new Date('2025-01-08T10:00:00'),
    location: 'LKJ Tennis Club',
    price: 0,
    featuredImage: '/hero2.jpg',
    status: 'published',
    featured: false,
    requiresRegistration: false,
    metaTitle: 'LKJ Tennis Club vs OTA Tennis Club',
    metaDescription: 'Exciting friendly competition between LKJ Tennis Club and OTA Tennis Club.',
  },
  {
    title: 'Professional Tennis Workshop',
    slug: 'professional-tennis-workshop',
    description: 'An insightful session with current Lagos state and Southwest champion, Abayomi Philips who shared valuable tips and techniques to improve our game.',
    content: `
      <h2>Professional Tennis Workshop</h2>
      <p>An insightful session with current Lagos state and Southwest champion, Abayomi Philips.</p>
      
      <h3>What We Learned</h3>
      <ul>
        <li>Advanced tennis techniques</li>
        <li>Professional training methods</li>
        <li>Mental game strategies</li>
        <li>Fitness and conditioning tips</li>
      </ul>
      
      <p>Participants gained valuable insights to improve their game from a champion.</p>
    `,
    startDate: new Date('2025-01-15T14:00:00'),
    location: 'LKJ Tennis Club',
    price: 0,
    featuredImage: '/events/pro-workshop.jpg',
    status: 'published',
    featured: false,
    requiresRegistration: false,
    metaTitle: 'Professional Tennis Workshop - LKJ Tennis Club',
    metaDescription: 'Insightful session with Lagos state and Southwest champion, Abayomi Philips.',
  },
  {
    title: 'New Court Launch Celebration',
    slug: 'new-court-launch-celebration',
    description: 'The grand opening of our newly constructed tennis court, marking a significant milestone for our club.',
    content: `
      <h2>New Court Launch</h2>
      <p>The grand opening of our newly constructed tennis court, marking a significant milestone for our club.</p>
      
      <h3>Highlights</h3>
      <ul>
        <li>State-of-the-art court surface</li>
        <li>Professional lighting system</li>
        <li>Enhanced playing experience</li>
        <li>Expanded capacity for members</li>
      </ul>
      
      <p>This new facility represents our commitment to providing world-class tennis facilities for our members.</p>
    `,
    startDate: new Date('2024-12-15T11:00:00'),
    location: 'LKJ Tennis Club',
    price: 0,
    featuredImage: '/events/court-launch.jpg',
    status: 'published',
    featured: false,
    requiresRegistration: false,
    metaTitle: 'New Court Launch Celebration - LKJ Tennis Club',
    metaDescription: 'Grand opening of our newly constructed tennis court.',
  },
  {
    title: 'Health & Wellness Event',
    slug: 'health-wellness-event',
    description: 'A comprehensive health awareness event focusing on fitness and well-being for tennis players.',
    content: `
      <h2>Health & Wellness Event</h2>
      <p>A comprehensive health awareness event focusing on fitness and well-being for tennis players.</p>
      
      <h3>Topics Covered</h3>
      <ul>
        <li>Nutrition for athletes</li>
        <li>Injury prevention</li>
        <li>Mental health and wellness</li>
        <li>Fitness routines for tennis players</li>
        <li>Recovery and rest strategies</li>
      </ul>
      
      <p>Health professionals provided valuable insights on maintaining peak performance and overall wellness.</p>
    `,
    startDate: new Date('2024-09-20T09:00:00'),
    location: 'LKJ Tennis Club',
    price: 0,
    featuredImage: '/events/health-event.jpg',
    status: 'published',
    featured: false,
    requiresRegistration: false,
    metaTitle: 'Health & Wellness Event - LKJ Tennis Club',
    metaDescription: 'Comprehensive health awareness event focusing on fitness and well-being for tennis players.',
  },
  {
    title: 'Junior Tennis Clinic & Competition',
    slug: 'junior-tennis-clinic-competition',
    description: 'Special tennis clinic and competition organized for young tennis enthusiasts, nurturing the next generation of players.',
    content: `
      <h2>Junior Tennis Clinic & Competition</h2>
      <p>Special tennis clinic and competition organized for young tennis enthusiasts, nurturing the next generation of players.</p>
      
      <h3>Program Features</h3>
      <ul>
        <li>Age-appropriate coaching</li>
        <li>Skill development sessions</li>
        <li>Friendly competitions</li>
        <li>Character building activities</li>
        <li>Fun games and drills</li>
      </ul>
      
      <p>Our junior program is designed to instill a love for tennis while developing fundamental skills.</p>
    `,
    startDate: new Date('2024-03-10T09:00:00'),
    location: 'LKJ Tennis Club',
    price: 0,
    featuredImage: '/events/junior-clinic.jpg',
    status: 'published',
    featured: false,
    requiresRegistration: false,
    metaTitle: 'Junior Tennis Clinic & Competition - LKJ Tennis Club',
    metaDescription: 'Special tennis clinic and competition for young tennis enthusiasts.',
  },
];

async function seedEvents() {
  try {
    console.log('🌱 Seeding events...');
    
    for (const eventData of existingEvents) {
      const existing = await prisma.event.findUnique({
        where: { slug: eventData.slug },
      });
      
      if (existing) {
        console.log(`⏭️  Event '${eventData.title}' already exists, skipping...`);
        continue;
      }
      
      const event = await prisma.event.create({
        data: eventData,
      });
      
      console.log(`✅ Created event: ${event.title}`);
    }
    
    console.log('🎉 Events seeding completed!');
    console.log(`📊 Total events: ${existingEvents.length}`);
  } catch (error) {
    console.error('❌ Error seeding events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedEvents();
