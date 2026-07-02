# 🚀 Quick Reference Guide

## Essential URLs

### Admin
- Dashboard: `/admin`
- Products: `/admin/products`
- Categories: `/admin/categories`
- Brands: `/admin/brands`
- Orders: `/admin/orders`
- Members: `/admin/members`

### User
- Profile: `/profile`
- Edit Profile: `/profile/edit`
- Address: `/profile/address`
- Orders: `/profile/orders`
- Link Membership: `/profile/link-membership`

### Shop
- Shop: `/shop`
- Checkout: `/shop/checkout`
- Product: `/shop/[slug]`

### Auth
- Sign In: `/auth/signin`
- Sign Up: `/auth/signup`

## Quick Tasks

### Add a Product
1. Go to `/admin/products/new`
2. Fill in details
3. Select category & brand
4. Upload images
5. Add sizes/colors (if needed)
6. Save

### Add Category
1. Go to `/admin/categories`
2. Click "Add Category"
3. Enter name, description, icon
4. Save

### Add Brand
1. Go to `/admin/brands`
2. Click "Add Brand"
3. Enter name, description, website
4. Save

### Link Membership
1. Go to `/profile/link-membership`
2. Enter membership ID
3. Check email for code
4. Enter code
5. Done!

### Save Address
1. Go to `/profile/address`
2. Fill in shipping details
3. Save
4. Checkout is now faster!

## Environment Variables

```env
# Database
DATABASE_URL="your-postgres-url"
DIRECT_URL="your-direct-url"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# NextAuth
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Email
RESEND_API_KEY="your-resend-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Database
npx prisma migrate dev
npx prisma generate
npx prisma studio

# Seed data
npx prisma db seed
```

## File Structure

```
src/
├── app/
│   ├── admin/          # Admin pages
│   ├── auth/           # Auth pages
│   ├── profile/        # User profile
│   ├── shop/           # Shop pages
│   ├── api/            # API routes
│   └── ...
├── components/         # React components
├── lib/               # Utilities
│   ├── auth.ts        # Auth config
│   ├── db.ts          # Database
│   ├── email.ts       # Email service
│   └── ...
└── types/             # TypeScript types

prisma/
└── schema.prisma      # Database schema
```

## Key Features

✅ User authentication
✅ Profile management
✅ Address management
✅ Membership linking
✅ Product catalog
✅ Category/brand management
✅ Shopping cart
✅ Checkout
✅ Order management
✅ Admin dashboard
✅ Image uploads
✅ QR codes
✅ Email notifications

## Support

Check these docs for help:
- `FINAL_SETUP_COMPLETE.md` - Complete overview
- `PRODUCT_MANAGEMENT_GUIDE.md` - Product help
- `ADDRESS_MANAGEMENT_COMPLETE.md` - Address help
- `MEMBERSHIP_LINKING_COMPLETE.md` - Membership help

## Quick Fixes

### Can't sign in?
- Check email is verified
- Check password is correct
- Try password reset

### Images not uploading?
- Check Cloudinary credentials
- Check file size (max 5MB)
- Check file format (PNG/JPG)

### Address not saving?
- Check you're signed in
- Check all required fields
- Check network connection

### Products not showing?
- Check stock > 0
- Check category exists
- Refresh page

## Tips

💡 **For faster checkout:** Save your address in profile
💡 **For better organization:** Create categories first, then brands, then products
💡 **For testing:** Use development mode to see verification codes in console
💡 **For mobile:** Everything is responsive, test on your phone!

## Need Help?

1. Check the documentation files
2. Check the error messages
3. Check the console logs
4. Check the database with Prisma Studio

**You've got this!** 🎾
