# 🛍️ Product Management Guide

## Overview

Complete guide for admins to upload and manage products in the LKJ Tennis Club shop.

## 🚀 Quick Start

### Access Admin Panel
1. Sign in as an admin user
2. Click your name in the navbar
3. Click "Admin Panel" or go to `/admin`
4. Click "Products" in the admin menu

## 📦 Managing Products

### View All Products

**URL:** `/admin/products`

**Features:**
- Table view of all products
- Product thumbnail images
- Category, price, and stock info
- Featured badge display
- Quick edit/delete actions
- Product count display

### Add New Product

**URL:** `/admin/products/new`

#### Step 1: Basic Information

**Required Fields:**
- **Product Name** - Full product name (e.g., "Wilson Pro Staff RF97")
- **Description** - Detailed product description
- **Category** - Select from dropdown:
  - Rackets
  - Tennis Balls
  - Men's Apparel
  - Women's Apparel
  - Shoes
  - Accessories
  - Strings
- **Price (₦)** - Product price in Naira
- **Stock Quantity** - Number of items available

**Optional Fields:**
- **Brand** - Product brand (e.g., Wilson, Nike, Adidas)
- **Featured** - Check to display on homepage

#### Step 2: Upload Images

**Image Requirements:**
- Format: PNG, JPG, JPEG
- Max size: 5MB per image
- Recommended: 800x800px or larger
- Multiple images supported

**How to Upload:**
1. Click the upload area
2. Select image from your computer
3. Wait for upload to complete
4. Image appears in preview grid
5. Repeat for additional images
6. Remove images by clicking the X button

**Image Tips:**
- First image is the main product image
- Upload multiple angles
- Use high-quality, well-lit photos
- Show product details clearly

#### Step 3: Product Options (Category-Specific)

**For Apparel (Men's/Women's):**

**Sizes:**
- Quick select: XS, S, M, L, XL, XXL, XXXL
- Add custom sizes if needed
- Multiple sizes can be selected
- Remove sizes by clicking X

**Colors:**
- Quick select: Black, White, Navy, Red, Blue, Green, Yellow, Gray, Pink, Purple
- Add custom colors if needed
- Multiple colors can be selected
- Remove colors by clicking X

**For Shoes:**

**Sizes:**
- Quick select: 6, 7, 8, 9, 10, 11, 12, 13, 14
- Add custom sizes (e.g., 6.5, 7.5)
- Multiple sizes can be selected

**Colors:**
- Same as apparel

**For Other Categories:**
- Sizes and colors not required
- Focus on description for specifications

#### Step 4: Submit

1. Review all information
2. Ensure at least one image is uploaded
3. Click "Create Product"
4. Product appears in shop immediately

### Edit Existing Product

**URL:** `/admin/products/[id]/edit`

**Process:**
1. Go to product list
2. Click edit icon (pencil) next to product
3. Modify any fields
4. Add/remove images
5. Update sizes/colors
6. Click "Update Product"

**Notes:**
- All fields are pre-filled with current data
- Changes are saved immediately
- Product slug updates automatically from name

### Delete Product

**Process:**
1. Go to product list
2. Click delete icon (trash) next to product
3. Confirm deletion in popup
4. Product is permanently removed

**Warning:**
- Deletion is permanent
- Cannot be undone
- Consider setting stock to 0 instead

## 🎨 Product Categories

### Rackets
- Tennis rackets of all types
- No size/color options needed
- Focus on specifications in description

### Tennis Balls
- Practice balls, match balls, etc.
- No size/color options needed
- Specify quantity per can/pack

### Men's Apparel
- Shirts, shorts, pants, jackets
- **Requires:** Sizes (XS-XXXL)
- **Optional:** Colors
- Specify material and fit in description

### Women's Apparel
- Shirts, skirts, dresses, pants
- **Requires:** Sizes (XS-XXXL)
- **Optional:** Colors
- Specify material and fit in description

### Shoes
- Tennis shoes for all players
- **Requires:** Sizes (6-14)
- **Optional:** Colors
- Specify features (cushioning, support, etc.)

### Accessories
- Bags, grips, wristbands, headbands, etc.
- No size/color options needed
- Describe dimensions if relevant

### Strings
- Racket strings
- No size/color options needed
- Specify gauge, material, length

## 💡 Best Practices

### Product Names
✅ **Good:**
- "Wilson Pro Staff RF97 Tennis Racket"
- "Nike Court Dri-FIT Men's Tennis Shirt"
- "Penn Championship Tennis Balls (3-Pack)"

❌ **Avoid:**
- "Racket"
- "Shirt"
- "Balls"

### Descriptions
**Include:**
- Key features and benefits
- Technical specifications
- Materials used
- Size/fit information
- Care instructions
- What's included

**Example:**
```
The Wilson Pro Staff RF97 is Roger Federer's racket of choice. 
Features:
- Head size: 97 sq in
- Weight: 340g
- String pattern: 16x19
- Beam width: 21.5mm
- Perfect for advanced players seeking control and precision
- Includes protective cover
```

### Pricing
- Use whole numbers when possible (₦25,000 not ₦25,000.50)
- Research competitive pricing
- Consider bulk discounts for multiple items
- Update prices regularly

### Stock Management
- Keep stock numbers accurate
- Set to 0 when out of stock (don't delete)
- Restock popular items promptly
- Monitor low stock items

### Images
- Use consistent background (white/neutral)
- Show product from multiple angles
- Include close-ups of details
- Show product in use if possible
- Maintain consistent image quality

### Featured Products
- Feature 4-6 products maximum
- Rotate featured products regularly
- Feature new arrivals or bestsellers
- Unfeature old products

## 🔍 Product Display

### Shop Page
- Products shown in grid layout
- Filtered by category
- Sorted by newest first
- Shows: image, name, brand, price, stock status

### Product Detail Page
- Image gallery with thumbnails
- Full description
- Size/color selectors (if applicable)
- Quantity picker
- Add to cart button
- Stock availability

### Homepage
- Featured products only
- Maximum 6 products shown
- Links to full shop

## 📊 Inventory Management

### Stock Levels
- **In Stock:** Stock > 0 (green badge)
- **Out of Stock:** Stock = 0 (red badge)
- Update stock after sales
- Consider safety stock levels

### Low Stock Alerts
- Monitor products with stock < 5
- Plan reorders in advance
- Communicate with suppliers

## 🛠️ Troubleshooting

### Image Upload Issues

**Problem:** Image won't upload
**Solutions:**
- Check file size (must be < 5MB)
- Verify file format (PNG, JPG only)
- Check internet connection
- Try a different image
- Compress image if too large

**Problem:** Image appears distorted
**Solutions:**
- Use square images (800x800px)
- Avoid very wide or tall images
- Crop image before uploading

### Product Not Showing

**Problem:** Product doesn't appear in shop
**Solutions:**
- Check if product was saved successfully
- Verify stock is > 0
- Check category is correct
- Refresh the shop page
- Clear browser cache

### Form Validation Errors

**Problem:** Can't submit product
**Solutions:**
- Fill all required fields (marked with *)
- Upload at least one image
- Enter valid price (numbers only)
- Enter valid stock (whole numbers)
- Check for error messages

## 📱 Mobile Management

- Admin panel works on mobile devices
- Upload images from phone camera
- Edit products on the go
- Responsive table view
- Touch-friendly buttons

## 🔐 Security

### Admin Access
- Only admin users can access `/admin` routes
- Regular users redirected to homepage
- Secure authentication required

### Data Validation
- All inputs validated server-side
- SQL injection prevention
- XSS protection
- File type validation

## 📈 Tips for Success

### Organize Your Catalog
1. Start with popular categories
2. Add products systematically
3. Use consistent naming
4. Maintain accurate stock
5. Update regularly

### Optimize for Sales
1. Use high-quality images
2. Write compelling descriptions
3. Price competitively
4. Feature bestsellers
5. Keep stock updated

### Customer Experience
1. Accurate product information
2. Clear sizing guides
3. Multiple product images
4. Honest stock availability
5. Prompt updates

## 🎯 Quick Reference

### Product Checklist
- [ ] Product name (descriptive)
- [ ] Full description
- [ ] Category selected
- [ ] Price set
- [ ] Stock quantity entered
- [ ] At least 1 image uploaded
- [ ] Brand added (if applicable)
- [ ] Sizes added (if apparel/shoes)
- [ ] Colors added (if applicable)
- [ ] Featured status set

### Common Tasks
- **Add product:** `/admin/products/new`
- **Edit product:** Click edit icon in product list
- **Delete product:** Click delete icon, confirm
- **View shop:** `/shop`
- **View product:** `/shop/[product-slug]`

## 🆘 Need Help?

### Common Questions

**Q: How many images can I upload?**
A: Unlimited, but 3-5 images per product is recommended.

**Q: Can I change the product URL?**
A: Yes, it updates automatically when you change the product name.

**Q: What happens to orders if I delete a product?**
A: Past orders are preserved, but product can't be ordered again.

**Q: Can I bulk upload products?**
A: Not currently, but you can add products quickly one at a time.

**Q: How do I feature a product?**
A: Check the "Featured Product" box when creating/editing.

## 🎉 You're Ready!

You now have everything you need to manage products effectively. Start by adding your first product and building your catalog!

**Remember:**
- Quality over quantity
- Keep information accurate
- Update regularly
- Monitor stock levels
- Respond to customer needs

Happy selling! 🎾
