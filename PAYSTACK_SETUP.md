# Paystack Payment Integration Guide

## ✅ What's Been Set Up

### 1. Package Installation
- `react-paystack` installed for payment processing

### 2. Environment Variables
Added to `.env`:
```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="your_paystack_public_key_here"
PAYSTACK_SECRET_KEY="your_paystack_secret_key_here"
```

### 3. Database Schema
Updated `Order` model with:
- `paymentReference` field to store Paystack transaction reference

### 4. Files Created/Updated

**New Files:**
- `src/lib/paystack.ts` - Paystack utility functions
- `src/app/api/paystack/verify/route.ts` - Payment verification endpoint

**Updated Files:**
- `src/app/shop/checkout/page.tsx` - Integrated Paystack payment
- `src/app/api/orders/route.ts` - Added payment reference handling
- `prisma/schema.prisma` - Added paymentReference field

## 🚀 Setup Steps

### Step 1: Get Paystack API Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Sign up or log in
3. Navigate to **Settings** → **API Keys & Webhooks**
4. Copy your **Public Key** and **Secret Key**

### Step 2: Update Environment Variables

Replace the placeholder values in `.env`:

```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_xxxxxxxxxxxxx"  # Your public key
PAYSTACK_SECRET_KEY="sk_test_xxxxxxxxxxxxx"              # Your secret key
```

**Important:** 
- Use **test keys** for development (start with `pk_test_` and `sk_test_`)
- Use **live keys** for production (start with `pk_live_` and `sk_live_`)

### Step 3: Update Database

Run Prisma migration to add the payment reference field:

```bash
npx prisma db push
```

### Step 4: Restart Development Server

```bash
npm run dev
```

## 💳 How It Works

### Payment Flow

1. **Customer fills checkout form**
   - Name, email, phone, shipping address
   - Selects payment method

2. **Card Payment (Paystack)**
   - Customer clicks "Pay with Paystack"
   - Paystack popup opens
   - Customer enters card details
   - Payment processed securely

3. **Payment Verification**
   - System verifies payment with Paystack API
   - Creates order with payment reference
   - Marks order as "paid"

4. **Order Confirmation**
   - Cart cleared
   - Customer redirected to confirmation page
   - Order saved with payment details

### Payment Methods

**Card Payment (Paystack):**
- Instant payment processing
- Secure card handling
- Automatic verification
- Order marked as "paid" immediately

**Bank Transfer:**
- Manual payment method
- Order created as "pending"
- Admin confirms payment manually

**Cash on Delivery:**
- No upfront payment
- Order created as "pending"
- Payment collected on delivery

## 🔧 Features

### For Customers
- **Secure payments** via Paystack
- **Multiple payment options** (card, transfer, cash)
- **Instant confirmation** for card payments
- **Payment tracking** with reference numbers

### For Admins
- **Payment status** visible in order details
- **Payment references** for verification
- **Transaction tracking** via Paystack dashboard

## 📊 Testing

### Test Cards (Paystack)

**Successful Payment:**
- Card: `4084084084084081`
- CVV: `408`
- Expiry: Any future date
- PIN: `0000`

**Failed Payment:**
- Card: `5060666666666666666`
- CVV: Any 3 digits
- Expiry: Any future date

### Test Flow

1. Add products to cart
2. Go to checkout
3. Fill in customer details
4. Select "Card Payment (Paystack)"
5. Click "Pay with Paystack"
6. Use test card details
7. Complete payment
8. Verify order created with payment reference

## 🔐 Security

- **Public key** is safe to expose (used in frontend)
- **Secret key** must be kept private (server-side only)
- Payment verification happens server-side
- Card details never touch your server

## 📱 Admin View

Orders with Paystack payments will show:
- Payment Status: "paid"
- Payment Method: "card"
- Payment Reference: "LKJ-1234567890-abc123"

You can verify transactions in your Paystack dashboard using the reference.

## 🐛 Troubleshooting

**"Paystack configuration error"**
- Check that `PAYSTACK_SECRET_KEY` is set in `.env`
- Restart your dev server after adding keys

**Payment popup doesn't open**
- Check that `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is set
- Verify the key starts with `pk_test_` or `pk_live_`

**Payment succeeds but order not created**
- Check browser console for errors
- Verify `/api/orders` endpoint is working
- Check database connection

## 🎯 Next Steps

1. **Get your Paystack keys** from the dashboard
2. **Update .env** with real keys
3. **Run database migration** (`npx prisma db push`)
4. **Test with test cards** to verify everything works
5. **Switch to live keys** when ready for production

## 📚 Resources

- [Paystack Documentation](https://paystack.com/docs)
- [React Paystack Docs](https://github.com/iamraphson/react-paystack)
- [Paystack Test Cards](https://paystack.com/docs/payments/test-payments)
