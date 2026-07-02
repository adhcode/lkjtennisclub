# Admin Panel Guide

## Overview
Complete admin panel for managing the LKJ Tennis Club shop and operations.

## Admin Routes

### Dashboard
- **URL**: `/admin`
- Quick overview with links to all admin sections
- Quick actions for common tasks

### Product Management
- **List**: `/admin/products` - View all products
- **Add**: `/admin/products/new` - Create new product
- **Edit**: `/admin/products/[id]/edit` - Edit existing product

#### Features:
- ✅ Image upload via Cloudinary
- ✅ Category-based fields (sizes, colors, brand)
- ✅ Stock management
- ✅ Featured products
- ✅ Delete products
- ✅ Real-time preview

### Order Management
- **URL**: `/admin/orders`
- View all customer orders
- Filter by status (pending, processing, shipped, delivered, cancelled)
- Update order status
- View order details
- Statistics dashboard

#### Order Statuses:
- **Pending**: New order, awaiting processing
- **Processing**: Order being prepared
- **Shipped**: Order sent to customer
- **Delivered**: Order received by customer
- **Cancelled**: Order cancelled

### Member Management
- **URL**: `/admin/members`
- Existing member management system
- QR code generation
- Member profiles

## API Endpoints

### Products
- `GET /api/products` - List all products (with caching)
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order (from checkout)
- `PATCH /api/orders/[id]` - Update order status

## Product Categories

### Available Categories:
1. **Rackets** - Tennis rackets
2. **Balls** - Tennis balls
3. **Men's Apparel** - Men's clothing
4. **Women's Apparel** - Women's clothing
5. **Shoes** - Tennis shoes
6. **Accessories** - Bags, grips, etc.

### Category-Specific Fields:
- **Apparel & Shoes**: Sizes, Colors, Brand
- **Rackets**: Brand, Weight, Head Size
- **Balls**: Brand, Quantity, Type
- **Accessories**: Brand, Type

## Image Upload

Uses Cloudinary for image hosting:
- Drag & drop or click to upload
- Automatic optimization
- Multiple images per product
- Remove images before saving

## Best Practices

### Products:
1. Always add at least one image
2. Write clear, detailed descriptions
3. Set accurate stock levels
4. Use featured flag for homepage display
5. Add brand for better filtering

### Orders:
1. Update status promptly
2. Check payment status before shipping
3. Keep customers informed
4. Use notes field for special instructions

### Performance:
- Products are cached for 5 minutes
- Orders are not cached (real-time)
- Images are optimized automatically
- Lazy loading on product grids

## Security Notes

⚠️ **Important**: This admin panel has no authentication!

For production, add:
1. Authentication (NextAuth.js recommended)
2. Role-based access control
3. Admin-only middleware
4. Audit logging
5. Rate limiting

## Quick Start

1. Access admin dashboard: `/admin`
2. Add products: `/admin/products/new`
3. Upload product images
4. Set prices and stock
5. Mark featured products for homepage
6. Monitor orders: `/admin/orders`
7. Update order statuses as needed

## Troubleshooting

### Images not uploading?
- Check Cloudinary credentials in `.env`
- Verify file size (max 10MB)
- Check internet connection

### Products not showing?
- Verify status is "active"
- Check stock level
- Clear browser cache

### Orders not appearing?
- Check database connection
- Verify order was created successfully
- Check browser console for errors
