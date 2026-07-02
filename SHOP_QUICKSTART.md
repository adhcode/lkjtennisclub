# Shop Quick Start Guide

## ✅ Setup Complete!

Your tennis club shop is now fully integrated and ready to use. The database schema has been synced successfully.

## 🚀 Getting Started

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Access the Shop

#### Customer-Facing Pages
- **Shop Homepage**: http://localhost:3000/shop
- **Main Website**: http://localhost:3000 (shop preview included)

#### Admin Pages
- **Product Management**: http://localhost:3000/admin/products
- **Add New Product**: http://localhost:3000/admin/products/new

## 📦 Adding Your First Product

1. Navigate to: http://localhost:3000/admin/products/new

2. Fill in the product details:
   - **Name**: e.g., "Wilson Pro Staff RF97"
   - **Description**: Detailed product description
   - **Category**: Select from dropdown (Rackets, Balls, Apparel, etc.)
   - **Brand**: e.g., "Wilson"
   - **Price**: In Naira (e.g., 85000)
   - **Stock**: Available quantity

3. Upload product images:
   - Click "Choose File" or drag & drop
   - Images are uploaded to Cloudinary
   - Add multiple images for gallery view

4. Configure options (if applicable):
   - **Sizes**: For apparel/shoes (S, M, L, XL, etc.)
   - **Colors**: Available color options

5. Mark as featured (optional):
   - Featured products appear on homepage

6. Click "Create Product"

## 🛒 Testing the Shop

### As a Customer:
1. Visit http://localhost:3000/shop
2. Browse products or filter by category
3. Click on a product to view details
4. Select size/color (if applicable)
5. Choose quantity
6. Click "Add to Cart"
7. Click cart icon in navbar to review
8. Click "Proceed to Checkout"
9. Fill in shipping information
10. Place order

### Order Confirmation:
- You'll receive an order number
- Order is saved in database
- Customer receives confirmation page

## 🎨 Design Features

### Consistent Branding
- ✅ Maroon (#911b1e) and Cream (#fcf7dc) color scheme
- ✅ Agrandir and Raleway fonts
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design (mobile, tablet, desktop)

### Navigation
- ✅ "Shop" link added to navbar
- ✅ Shopping cart icon with item count
- ✅ Slide-out cart drawer
- ✅ Mobile-friendly menu

## 📊 Product Categories

Pre-configured categories:
1. **Rackets** - Tennis rackets (supports brand, weight, specs)
2. **Tennis Balls** - Ball cans and sets
3. **Apparel** - Clothing (supports sizes & colors)
4. **Shoes** - Footwear (supports sizes & colors)
5. **Accessories** - Bags, grips, etc.
6. **Strings** - Racket strings

## 🔧 Key Features

### Shopping Cart
- Persistent across page refreshes (localStorage)
- Real-time count in navbar
- Add/remove/update quantities
- Automatic total calculation

### Product Management
- Full CRUD operations
- Image upload via Cloudinary
- Stock tracking
- Featured products
- Category filtering

### Checkout
- Customer information
- Shipping address
- Payment method selection:
  - Bank Transfer
  - Card Payment (ready for integration)
  - Cash on Delivery
- Order confirmation with unique order number

## 📱 Responsive Design

Tested and optimized for:
- ✅ Mobile phones (320px+)
- ✅ Tablets (768px+)
- ✅ Laptops (1024px+)
- ✅ Desktops (1280px+)

## 🔐 Admin Access

Currently, admin pages are accessible directly. For production:

### Recommended: Add Authentication
```bash
npm install next-auth
```

Then protect admin routes with middleware.

## 💳 Payment Integration (Next Step)

The checkout is ready for payment gateway integration:

### Paystack Integration
```bash
npm install react-paystack
```

### Flutterwave Integration
```bash
npm install flutterwave-react-v3
```

Update `/src/app/shop/checkout/page.tsx` to add payment processing.

## 📧 Email Notifications (Recommended)

Add email confirmations using:
- Resend
- SendGrid
- Nodemailer

## 🗄️ Database

Your PostgreSQL database now includes:
- ✅ `products` table
- ✅ `orders` table
- ✅ `order_items` table

Existing tables remain unchanged:
- `members`
- `registrations`
- `tournament_registrations`

## 🎯 Next Steps

### Immediate
1. Add your first product
2. Test the complete shopping flow
3. Customize product categories if needed

### Short-term
1. Add more products
2. Upload product images
3. Set featured products
4. Test on mobile devices

### Long-term
1. Integrate payment gateway
2. Add email notifications
3. Implement order tracking
4. Add product search
5. Customer reviews
6. Discount codes

## 📝 Important Files

### Configuration
- `prisma/schema.prisma` - Database schema
- `src/lib/productCategories.ts` - Category definitions
- `src/lib/cart.ts` - Cart management

### Pages
- `src/app/shop/page.tsx` - Shop listing
- `src/app/shop/[slug]/page.tsx` - Product details
- `src/app/shop/checkout/page.tsx` - Checkout
- `src/app/admin/products/page.tsx` - Admin dashboard

### Components
- `src/components/ProductCard.tsx` - Product display
- `src/components/CartDrawer.tsx` - Shopping cart
- `src/components/ShopPreview.tsx` - Homepage section

### API Routes
- `src/app/api/products/route.ts` - Products API
- `src/app/api/orders/route.ts` - Orders API

## 🐛 Troubleshooting

### Cart not updating?
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`
- Refresh the page

### Images not uploading?
- Verify Cloudinary credentials in `.env`
- Check `CLOUDINARY_SETUP.md` for configuration

### Products not showing?
- Ensure database is connected
- Check `.env` for `DATABASE_URL`
- Run `npx prisma studio` to view database

### Styling issues?
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

## 📚 Documentation

- Full documentation: `SHOP_SETUP.md`
- Cloudinary setup: `CLOUDINARY_SETUP.md`

## 🎉 You're Ready!

Your tennis club shop is fully functional and ready for products. The design seamlessly integrates with your existing website while providing a modern shopping experience.

Start by adding your first product and testing the complete flow!

---

Need help? Check the full documentation in `SHOP_SETUP.md`
