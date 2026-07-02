# Paystack Webhook - Quick Answer

## Do You Need It?

### For Development/Testing: **NO** ❌
Your current setup works fine. Payment verification happens in the frontend.

### For Production: **YES** ✅
Webhooks ensure you never lose an order, even if:
- User closes browser after payment
- Network fails
- Frontend crashes

## What I've Done

✅ Created webhook endpoint: `/api/paystack/webhook`
✅ Handles `charge.success` and `charge.failed`
✅ Verifies Paystack signatures
✅ Updates orders automatically

## To Enable (When Ready for Production)

### 1. Local Testing
```bash
# Install ngrok
brew install ngrok

# Start dev server
npm run dev

# Start ngrok (in another terminal)
ngrok http 3000

# Copy the HTTPS URL
```

### 2. Configure Paystack
1. Go to https://dashboard.paystack.com
2. Settings → Webhooks
3. Add webhook URL: `https://your-ngrok-url.ngrok.io/api/paystack/webhook`
4. Select events: `charge.success`, `charge.failed`
5. Save

### 3. Test
Make a test payment and check your terminal for:
```
✅ Payment successful: LKJ-xxx
```

## For Now

**You can skip webhooks** and use your current setup. It works perfectly for:
- Development
- Testing
- Low-volume stores

**Add webhooks later** when you're ready for production.

## Full Guide

See [PAYSTACK_WEBHOOK_SETUP.md](./PAYSTACK_WEBHOOK_SETUP.md) for complete instructions.
