# Paystack Webhook Setup Guide

## Why Webhooks?

### Current Setup (Client-Side Only)
```
User pays → Frontend verifies → Creates order
```
**Problems:**
- ❌ User closes browser = no order created
- ❌ Network issues = payment lost
- ❌ No backup verification

### With Webhooks (Production-Ready)
```
User pays → Paystack notifies your server → Order created/updated
           ↓
        Frontend also verifies (backup)
```
**Benefits:**
- ✅ Reliable - server-to-server
- ✅ Automatic - no user action needed
- ✅ Backup - works even if frontend fails
- ✅ Real-time - instant notifications

## Setup Steps

### Step 1: Webhook Endpoint Created ✅

Your webhook is ready at:
```
https://yourdomain.com/api/paystack/webhook
```

For local testing:
```
http://localhost:3000/api/paystack/webhook
```

### Step 2: Configure Paystack Dashboard

1. **Go to Paystack Dashboard**
   - Visit https://dashboard.paystack.com
   - Sign in to your account

2. **Navigate to Settings**
   - Click "Settings" in sidebar
   - Click "Webhooks"

3. **Add Webhook URL**
   - Click "Add Webhook"
   - Enter your URL:
     - **Production:** `https://yourdomain.com/api/paystack/webhook`
     - **Testing:** Use ngrok (see below)
   
4. **Select Events**
   Check these events:
   - ✅ `charge.success` - Payment successful
   - ✅ `charge.failed` - Payment failed
   
5. **Save**
   - Click "Save"
   - Paystack will test the endpoint

### Step 3: Test Locally with ngrok

Since Paystack can't reach `localhost`, use ngrok:

```bash
# Install ngrok
brew install ngrok  # macOS
# or download from https://ngrok.com

# Start your dev server
npm run dev

# In another terminal, start ngrok
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Add to Paystack: https://abc123.ngrok.io/api/paystack/webhook
```

### Step 4: Test the Webhook

1. **Make a test payment**
   - Use test card: `4084084084084081`
   - Complete payment

2. **Check webhook received**
   - Look at your terminal logs
   - Should see: `✅ Payment successful: LKJ-xxx`

3. **Verify in Paystack Dashboard**
   - Go to Settings → Webhooks
   - Click "Webhook Logs"
   - See successful deliveries

## How It Works

### Payment Flow with Webhooks

```
1. User clicks "Pay Now"
   ↓
2. Paystack popup opens
   ↓
3. User completes payment
   ↓
4. Paystack sends webhook to your server ⚡
   ↓
5. Your server verifies signature
   ↓
6. Your server updates order status
   ↓
7. Frontend also verifies (backup)
   ↓
8. User sees confirmation
```

### Webhook Events

**charge.success**
```json
{
  "event": "charge.success",
  "data": {
    "reference": "LKJ-1234567890-abc",
    "amount": 50000,  // in kobo (₦500)
    "customer": {
      "email": "customer@example.com"
    },
    "status": "success"
  }
}
```

**charge.failed**
```json
{
  "event": "charge.failed",
  "data": {
    "reference": "LKJ-1234567890-abc",
    "status": "failed"
  }
}
```

## Security

### Signature Verification

Every webhook includes a signature header:
```
x-paystack-signature: abc123...
```

Your endpoint verifies it:
```typescript
const hash = crypto
  .createHmac('sha512', PAYSTACK_SECRET_KEY)
  .update(body)
  .digest('hex');

if (hash !== signature) {
  // Reject - not from Paystack
}
```

This ensures webhooks are actually from Paystack!

## Handling Edge Cases

### 1. Duplicate Webhooks
Paystack may send the same webhook multiple times.

**Solution:** Check if order already updated
```typescript
if (order.paymentStatus === 'paid') {
  return; // Already processed
}
```

### 2. Order Not Found
Webhook arrives before frontend creates order.

**Solution:** Webhook logs warning, frontend creates order anyway
```typescript
if (!order) {
  console.log('Order not found yet');
  return; // Frontend will handle
}
```

### 3. Webhook Fails
Network issues, server down, etc.

**Solution:** Paystack retries automatically
- Retry 1: After 1 minute
- Retry 2: After 5 minutes
- Retry 3: After 30 minutes

## Testing

### Test Successful Payment

```bash
# 1. Start dev server
npm run dev

# 2. Start ngrok
ngrok http 3000

# 3. Update Paystack webhook URL

# 4. Make test payment
# Use card: 4084084084084081

# 5. Check terminal logs
# Should see: ✅ Payment successful
```

### Test Failed Payment

```bash
# Use card: 5060666666666666666
# Should see: ❌ Payment failed
```

### Test Webhook Manually

```bash
# Send test webhook from Paystack dashboard
# Settings → Webhooks → Test Webhook
```

## Production Checklist

- [ ] Webhook URL configured in Paystack
- [ ] Using HTTPS (required for production)
- [ ] Secret key is secure (not in git)
- [ ] Signature verification enabled
- [ ] Error logging set up
- [ ] Tested with real payments
- [ ] Monitoring webhooks in dashboard

## Monitoring

### Check Webhook Logs

**Paystack Dashboard:**
1. Settings → Webhooks
2. Click "Webhook Logs"
3. See all deliveries and responses

**Your Server:**
```bash
# Check your application logs
# Look for:
# ✅ Payment successful: LKJ-xxx
# ❌ Payment failed: LKJ-xxx
```

## Troubleshooting

### Webhook Not Received

**Check:**
1. URL is correct in Paystack
2. Server is running
3. Firewall allows Paystack IPs
4. HTTPS is working (production)
5. Endpoint returns 200 status

### Signature Verification Fails

**Check:**
1. Using correct secret key
2. Not modifying request body
3. Reading raw body (not parsed JSON)

### Order Not Updated

**Check:**
1. Payment reference matches
2. Order exists in database
3. No database errors in logs
4. Webhook handler completed

## Best Practices

1. **Always return 200**
   - Even if processing fails
   - Paystack will retry otherwise

2. **Process asynchronously**
   - Don't block webhook response
   - Queue heavy tasks

3. **Log everything**
   - Log all webhooks received
   - Log processing results
   - Monitor for issues

4. **Handle duplicates**
   - Check if already processed
   - Use idempotency

5. **Verify signatures**
   - Never skip verification
   - Protects against fake webhooks

## Current vs Webhook Flow

### Without Webhooks (Current)
```
✅ Works for most cases
⚠️ Can lose orders if user closes browser
⚠️ No backup if frontend fails
```

### With Webhooks (Recommended)
```
✅ Reliable server-to-server
✅ Works even if user closes browser
✅ Automatic retries
✅ Production-ready
```

## Do You Need Webhooks?

### You can skip webhooks if:
- Testing/development only
- Low transaction volume
- Users always wait for confirmation

### You NEED webhooks if:
- Production environment
- High transaction volume
- Can't afford to lose orders
- Want reliable payment tracking

## Quick Start

```bash
# 1. Webhook endpoint already created ✅

# 2. For local testing:
ngrok http 3000

# 3. Add to Paystack:
https://your-ngrok-url.ngrok.io/api/paystack/webhook

# 4. Test with payment

# 5. Check logs for:
✅ Payment successful: LKJ-xxx
```

## Summary

**Webhook Endpoint:** ✅ Created
**Location:** `/api/paystack/webhook`
**Events Handled:** 
- `charge.success` - Updates order to paid
- `charge.failed` - Marks order as failed

**Next Steps:**
1. Configure in Paystack dashboard
2. Test with ngrok locally
3. Deploy and use production URL
4. Monitor webhook logs

**Your current setup works fine for development. Add webhooks before going to production!**
