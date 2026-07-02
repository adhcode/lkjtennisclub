import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@lkjtennisclub.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123';
    const name = process.env.ADMIN_NAME || 'Admin User';

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('❌ Admin user already exists with email:', email);
      console.log('To update, delete the existing user first or use a different email.');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'admin',
        emailVerified: new Date(), // Auto-verify admin
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Name:', name);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    console.log('🔗 Login at: http://localhost:3000/auth/signin');
    console.log('');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
