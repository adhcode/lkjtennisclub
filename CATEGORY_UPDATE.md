# Category Update - Apparel Split

## Changes Made

The apparel category has been split into two separate categories for better organization:

### Old Category
- `apparel` - General apparel

### New Categories
- `mens-apparel` - Men's Apparel
- `womens-apparel` - Women's Apparel

## Updated Files

1. **src/lib/productCategories.ts**
   - Split apparel into mens-apparel and womens-apparel
   - Updated size options for each category
   - Men's sizes: S, M, L, XL, XXL, XXXL
   - Women's sizes: XS, S, M, L, XL, XXL

2. **src/app/admin/products/new/page.tsx**
   - Updated size selection logic to handle both categories

3. **prisma/seed.ts**
   - Updated sample products to use new categories
   - Added women's apparel products (skirt, tank top)
   - Updated men's apparel products

## Current Categories

1. **Rackets** - Tennis rackets
2. **Tennis Balls** - Ball cans and sets
3. **Men's Apparel** - Men's tennis clothing
4. **Women's Apparel** - Women's tennis clothing
5. **Shoes** - Tennis footwear
6. **Accessories** - Bags, grips, etc.
7. **Strings** - Racket strings

## Migration Notes

### If you have existing products with category "apparel":

You'll need to update them manually to either `mens-apparel` or `womens-apparel`:

**Option 1: Using Prisma Studio**
```bash
npm run db:studio
```
Then manually update each product's category field.

**Option 2: Using SQL**
```sql
-- Update all apparel products to mens-apparel
UPDATE products 
SET category = 'mens-apparel' 
WHERE category = 'apparel';

-- Or update specific products to womens-apparel
UPDATE products 
SET category = 'womens-apparel' 
WHERE id IN ('product-id-1', 'product-id-2');
```

**Option 3: Via API**
Update products through the admin interface at `/admin/products`

## Benefits

✅ Better product organization  
✅ Gender-specific sizing  
✅ Easier filtering for customers  
✅ More accurate product categorization  
✅ Better inventory management  

## Testing

After updating:
1. Visit `/shop` and verify both categories appear
2. Filter by "Men's Apparel" and "Women's Apparel"
3. Add products to both categories
4. Verify size options are correct for each category

---

Updated: January 2026
