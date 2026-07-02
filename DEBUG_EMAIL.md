# Debug Email Verification

## Quick Checks

### 1. Test Email Sending

Visit this URL in your browser:
```
http://localhost:3000/api/test-email
```

**Expected result:**
- Should see: `{"success":true,"result":{...}}`
- Check your terminal for logs

**If you see an error:**
- Check the error message
- Verify your Resend API key is correct

### 2. Check Terminal Logs

When you sign up, look for these logs in your terminal:
```
Email send result: { success: true }
```

**If you see errors:**
- Copy the error message
- Check if it's an API key issue
- Check if it's a rate limit issue (100 emails/day on free tier)

### 3. Check Resend Dashboard

Go to: https://resend.com/emails

- Sign in with your Resend account
- Check the "Emails" tab
- Look for recent emails
- Check delivery status

### 4. Check Your Email

**Where to look:**
- Inbox
- Spam/Junk folder
- Promotions tab (Gmail)
- Updates tab (Gmail)

**Email details:**
- From: LKJ Tennis Club <onboarding@resend.dev>
- Subject: "Verify your email address"

## Common Issues

### Issue 1: Invalid API Key

**Error:** `Invalid API key`

**Solution:**
1. Go to: https://resend.com/api-keys
2. Create a new API key
3. Copy it
4. Update `.env`:
   ```env
   RESEND_API_KEY="re_your_new_key_here"
   ```
5. Restart your server

### Issue 2: Rate Limit Exceeded

**Error:** `Rate limit exceeded`

**Solution:**
- Free tier: 100 emails/day
- Wait 24 hours or upgrade plan
- Check Resend dashboard for usage

### Issue 3: Email Not Arriving

**Possible causes:**
1. **Spam folder** - Check spam/junk
2. **Wrong email** - Verify you entered correct email
3. **Delay** - Wait 2-3 minutes
4. **Resend issue** - Check Resend dashboard

### Issue 4: Email Verification Disabled

**Current status:**
Email verification is temporarily disabled so you can sign in without verifying.

**To enable it:**
1. Make sure emails are working
2. Edit `src/lib/auth.ts`
3. Uncomment these lines:
   ```typescript
   if (!user.emailVerified) {
     throw new Error('Please verify your email before signing in');
   }
   ```
4. Restart server

## Manual Testing Steps

### Step 1: Test Email API
```bash
# Visit in browser:
http://localhost:3000/api/test-email

# Should see success message
```

### Step 2: Check Logs
```bash
# In your terminal, you should see:
Email send result: { success: true, ... }
```

### Step 3: Sign Up
```bash
# Go to:
http://localhost:3000/auth/signup

# Create account
# Check terminal for logs
```

### Step 4: Check Database
```bash
# Open Prisma Studio:
npx prisma studio

# Check:
# 1. User was created
# 2. VerificationToken was created
# 3. emailVerified is null
```

## Debugging Commands

### Check if Resend package is installed
```bash
npm list resend
# Should show: resend@6.9.1
```

### Reinstall Resend
```bash
npm install resend@latest
```

### Check environment variables
```bash
# In your terminal:
echo $RESEND_API_KEY
# Should show your API key
```

### View server logs
```bash
# Your terminal should show:
# - Registration attempt
# - Email send result
# - Any errors
```

## Quick Fix: Skip Email Verification

If you want to use the app now while debugging email:

**Current status:** ✅ Already disabled!

You can sign up and sign in without email verification. The verification email will still be sent (if working), but you don't need to verify to sign in.

## Re-enable Email Verification

Once emails are working:

1. Edit `src/lib/auth.ts`
2. Find this section:
   ```typescript
   // Temporarily allow unverified users to sign in while debugging
   // TODO: Uncomment this after email is working
   // if (!user.emailVerified) {
   //   throw new Error('Please verify your email before signing in');
   // }
   ```
3. Uncomment the if statement:
   ```typescript
   if (!user.emailVerified) {
     throw new Error('Please verify your email before signing in');
   }
   ```
4. Restart server

## Get Help

### Check Resend Status
https://status.resend.com/

### Resend Documentation
https://resend.com/docs

### Check Logs
Look in your terminal for:
- `Email send result:`
- `Failed to send verification email:`
- Any error messages

## Next Steps

1. **Test the email API:** Visit `/api/test-email`
2. **Check terminal logs** when signing up
3. **Check Resend dashboard** for email delivery
4. **Check spam folder** in your email
5. **Try signing in** (verification is disabled for now)

If emails still don't work, you can use the app without verification for now. Google OAuth works perfectly and doesn't need email verification!
