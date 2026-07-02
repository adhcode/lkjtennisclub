# LKJ Tennis Club - Shop Feature Documentation

## Overview
A modern e-commerce solution integrated into the LKJ Tennis Club website, maintaining the existing design aesthetic with maroon (#911b1e) and cream (#fcf7dc) color scheme.

## Features Implemented

### 1. Product Management
- **Admin Dashboard**: `/admin/products`
  - View all products in a table format
  - Add, edit, and delete products
  - Track stock levels and featured status
  
- **Add Products**: `/admin/products/new`
  - Upload multiple product images via Cloudinary
  - Set product details (name, description, price, stock)
  - Configure sizes and colors for apparel/shoes
  - Mark products as featured
  - Automatic slug generation

### 2. Product Categories
Organized into 6 main categories:
- **Rackets**: Tennis rackets for all skill levels
- **Tennis Balls**: Professional and recreational balls
- **Apparel**: Tennis clothing and sportswear
- **Shoes**: Tennis footwear
- **Accessories**: Bags, grips, and other accessories
- **Strings**: Racket strings

### 3. Shopping Experience
- **Shop Page**: `/shop`
  - Grid layout with product cards
  - Category filtering
  - Real-time product availability
  
- **Product Detail**: `/shop/[slug]`
  - Multiple image gallery
  - Size and color selection
  - Quantity selector
  - Add to cart functionality
  - Stock availability display

### 4. Shopping Cart
- Persistent cart using localStorage
- Cart drawer accessible from navbar
- Real-time cart count badge
- Update quantities or remove items
- Automatic total calculation

### 5. Checkout Process
- **Checkout Page**: `/shop/checkout`
  - Customer information form
  - Shipping address
  - Payment method selection (Bank Transfer, Card, Cash on Delivery)
  - Order summary with shipping costs
  
- **Order Confirmation**: `/shop/order-confirmation/[orderNumber]`
  - Success message with order number
  - Email confirmation notification

### 6. Homepage Integration
- Featured products section on homepage
- Seamless design integration
- Direct links to shop

## Database Schema

### Product Model
```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Float
  category    String
  images      String[]
  stock       Int
  featured    Boolean
  sizes       String[]
  colors      String[]
  brand       String?
  status      String
}
```

### Order Model
```prisma
model Order {
  id              String
  orderNumber     String @unique
  customerName    String
  customerEmail   String
  customerPhone   String
  shippingAddress String
  total           Float
  status          String
  paymentStatus   String
  orderItems      OrderItem[]
}
```

## API Routes

### Products
- `GET /api/products` - List all products (with optional category/featured filters)
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `POST /api/orders` - Create new order

## Usage Guide

### For Administrators

#### Adding a Product
1. Navigate to `/admin/products`
2. Click "Add Product"
3. Fill in product details:
   - Name, description, price
   - Select category
   - Upload images (via Cloudinary)
   - Set stock quantity
   - Add sizes/colors if applicable
   - Mark as featured (optional)
4. Click "Create Product"

#### Managing Products
- View all products in the admin dashboard
- Edit products by clicking the edit icon
- Delete products with confirmation
- Monitor stock levels

### For Customers

#### Shopping
1. Visit `/shop` or click "Shop" in navbar
2. Browse products or filter by category
3. Click on a product to view details
4. Select size/color if applicable
5. Choose quantity
6. Click "Add to Cart"

#### Checkout
1. Click cart icon in navbar
2. Review items in cart drawer
3. Click "Proceed to Checkout"
4. Fill in shipping and contact information
5. Select payment method
6. Click "Place Order"
7. Receive order confirmation with order number

## Design Consistency

### Color Scheme
- Primary: `#911b1e` (Maroon)
- Secondary: `#fcf7dc` (Cream)
- Background: `#fcf7dc`
- Text: `#911b1e`

### Typography
- Headings: Agrandir font
- Body: Raleway font
- Consistent with existing site design

### Components
- Smooth animations using Framer Motion
- Responsive design (mobile-first)
- Accessible UI elements
- Consistent button styles and hover effects

## Cart Management

The cart uses localStorage for persistence:
- Cart data survives page refreshes
- Syncs across tabs
- Automatic total calculation
- Real-time count updates in navbar

## Payment Integration (Future Enhancement)

Currently supports three payment methods:
1. **Bank Transfer** - Manual verification
2. **Card Payment** - Ready for Paystack/Flutterwave integration
3. **Cash on Delivery** - For local deliveries

To integrate payment gateway:
1. Add payment provider SDK
2. Update checkout page with payment form
3. Handle payment callbacks
4. Update order payment status

## Shipping Configuration

Default shipping cost: ₦2,000
- Can be configured per order
- Future: Add shipping zones/rates
- Future: Integrate with delivery services

## Next Steps

### Recommended Enhancements
1. **Product Search**: Add search functionality
2. **Product Reviews**: Customer ratings and reviews
3. **Wishlist**: Save products for later
4. **Order Tracking**: Customer order history and status
5. **Inventory Alerts**: Low stock notifications
6. **Discount Codes**: Promotional codes and coupons
7. **Related Products**: Product recommendations
8. **Email Notifications**: Automated order confirmations
9. **Analytics**: Sales tracking and reporting
10. **Payment Gateway**: Integrate Paystack or Flutterwave

### Admin Enhancements
1. Order management dashboard
2. Sales reports and analytics
3. Bulk product upload
4. Product variants management
5. Customer management

## File Structure

```
src/
├── app/
│   ├── shop/
│   │   ├── page.tsx                    # Shop listing
│   │   ├── [slug]/page.tsx             # Product detail
│   │   ├── checkout/page.tsx           # Checkout
│   │   └── order-confirmation/[orderNumber]/page.tsx
│   ├── admin/
│   │   └── products/
│   │       ├── page.tsx                # Product list
│   │       └── new/page.tsx            # Add product
│   └── api/
│       ├── products/
│       │   ├── route.ts                # Products API
│       │   └── [id]/route.ts           # Single product API
│       └── orders/
│           └── route.ts                # Orders API
├── components/
│   ├── ProductCard.tsx                 # Product card component
│   ├── CartDrawer.tsx                  # Shopping cart drawer
│   ├── ShopPreview.tsx                 # Homepage shop section
│   └── Navbar.tsx                      # Updated with cart
└── lib/
    ├── cart.ts                         # Cart utilities
    └── productCategories.ts            # Category definitions
```

## Testing Checklist

- [ ] Add product with images
- [ ] View products on shop page
- [ ] Filter by category
- [ ] View product details
- [ ] Add to cart
- [ ] Update cart quantities
- [ ] Remove from cart
- [ ] Complete checkout
- [ ] Verify order creation
- [ ] Test responsive design
- [ ] Test cart persistence

## Support

For issues or questions:
- Check database connection in `.env`
- Verify Cloudinary setup for image uploads
- Ensure Prisma client is generated
- Check browser console for errors

## Maintenance

### Regular Tasks
1. Monitor stock levels
2. Update product information
3. Process orders
4. Handle customer inquiries
5. Update featured products

### Database Maintenance
- Regular backups
- Monitor order volume
- Clean up old cart data (if implementing server-side carts)
- Archive completed orders

---

Built with Next.js 15, Prisma, PostgreSQL, and Cloudinary
Designed to match LKJ Tennis Club brand identity
