import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding sample products...');

  // Sample products
  const products = [
    {
      name: 'Wilson Pro Staff RF97 Autograph',
      slug: 'wilson-pro-staff-rf97-autograph',
      description: 'The Wilson Pro Staff RF97 Autograph is a precision instrument designed for advanced players. Co-designed with Roger Federer, this racket offers exceptional control and feel with its 97 square inch head and 340g weight.',
      price: 85000,
      category: 'rackets',
      images: ['/placeholder-racket.jpg'],
      stock: 15,
      featured: true,
      brand: 'Wilson',
      sizes: [],
      colors: [],
      status: 'active',
    },
    {
      name: 'Nike Court Dri-FIT Victory Polo',
      slug: 'nike-court-dri-fit-victory-polo',
      description: 'Stay cool and comfortable on the court with this premium tennis polo. Features moisture-wicking Dri-FIT technology and a classic fit perfect for competitive play.',
      price: 12000,
      category: 'mens-apparel',
      images: ['/placeholder-shirt.jpg'],
      stock: 30,
      featured: true,
      brand: 'Nike',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Navy', 'Black'],
      status: 'active',
    },
    {
      name: 'Wilson Championship Tennis Balls',
      slug: 'wilson-championship-tennis-balls',
      description: 'Official tournament tennis balls. Premium quality with excellent durability and consistent performance. Can of 3 balls.',
      price: 3500,
      category: 'balls',
      images: ['/placeholder-balls.jpg'],
      stock: 50,
      featured: true,
      brand: 'Wilson',
      sizes: [],
      colors: [],
      status: 'active',
    },
    {
      name: 'Babolat Pure Drive 2024',
      slug: 'babolat-pure-drive-2024',
      description: 'The most popular racket in the world. Perfect blend of power and control for intermediate to advanced players. 100 square inch head size.',
      price: 78000,
      category: 'rackets',
      images: ['/placeholder-racket.jpg'],
      stock: 12,
      featured: false,
      brand: 'Babolat',
      sizes: [],
      colors: [],
      status: 'active',
    },
    {
      name: 'Adidas Barricade Court Shoes',
      slug: 'adidas-barricade-court-shoes',
      description: 'Professional tennis shoes with superior stability and durability. Features Adiwear outsole for maximum traction on all court surfaces.',
      price: 35000,
      category: 'shoes',
      images: ['/placeholder-shoes.jpg'],
      stock: 20,
      featured: false,
      brand: 'Adidas',
      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
      colors: ['White/Blue', 'Black/Red'],
      status: 'active',
    },
    {
      name: 'Head Tennis Racket Bag',
      slug: 'head-tennis-racket-bag',
      description: 'Spacious tennis bag with multiple compartments. Holds up to 6 rackets plus shoes, clothing, and accessories. Padded shoulder straps for comfort.',
      price: 18000,
      category: 'accessories',
      images: ['/placeholder-bag.jpg'],
      stock: 15,
      featured: false,
      brand: 'Head',
      sizes: [],
      colors: ['Black', 'Navy', 'Red'],
      status: 'active',
    },
    {
      name: 'Luxilon ALU Power 125 String',
      slug: 'luxilon-alu-power-125-string',
      description: 'Premium polyester string used by professional players. Excellent control and spin potential. 12m set.',
      price: 8500,
      category: 'strings',
      images: ['/placeholder-string.jpg'],
      stock: 25,
      featured: false,
      brand: 'Luxilon',
      sizes: [],
      colors: [],
      status: 'active',
    },
    {
      name: 'Under Armour Tennis Shorts',
      slug: 'under-armour-tennis-shorts',
      description: 'Lightweight and breathable tennis shorts with moisture-wicking fabric. Perfect for intense matches and training sessions.',
      price: 9500,
      category: 'mens-apparel',
      images: ['/placeholder-shorts.jpg'],
      stock: 25,
      featured: false,
      brand: 'Under Armour',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Gray'],
      status: 'active',
    },
    {
      name: 'Nike Court Victory Tennis Skirt',
      slug: 'nike-court-victory-tennis-skirt',
      description: "Women's tennis skirt with built-in shorts. Dri-FIT technology keeps you dry and comfortable during intense play.",
      price: 11000,
      category: 'womens-apparel',
      images: ['/placeholder-skirt.jpg'],
      stock: 20,
      featured: false,
      brand: 'Nike',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Navy'],
      status: 'active',
    },
    {
      name: 'Adidas Club Tennis Tank Top',
      slug: 'adidas-club-tennis-tank-top',
      description: "Women's sleeveless tennis top with moisture-wicking fabric. Lightweight and breathable for maximum comfort.",
      price: 8500,
      category: 'womens-apparel',
      images: ['/placeholder-tank.jpg'],
      stock: 30,
      featured: false,
      brand: 'Adidas',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Pink', 'Blue'],
      status: 'active',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log(`✅ Created product: ${product.name}`);
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
