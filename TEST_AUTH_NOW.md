# Test Your Authentication Now! 🧪

## Quick Test (2 minutes)

### Test Email Verification

1. **Go to signup:**
   ```
   http://localhost:3000/auth/signup
   ```

2. **Create account:**
   ```
   Name: Test User
   Email: YOUR-REAL-EMAIL@gmail.com  ← Use your real email!
   Password: password123
   ```

3. **Check your email:**
   - Look for: "Verify your email address"
   - From: LKJ Tennis Club
   - Click the verification link

4. **Success!**
   - You'll see: "Email Verified! 🎉"
   - Check for welcome email
   - Sign in at: http://localhost:3000/auth/signin

### Test Google OAuth

1. **Go to signin:**
   ```
   http://localhost:3000/auth/signin
   ```

2. **Click "Continue with Google"**

3. **Sign in with your Google account**

4. **Done!** You're signed in immediately

## What to Expect

### After Signup (Email/Password)
- ✅ Redirected to "Check your email" page
- ✅ Receive verification email within seconds
- ✅ Click link → See "Email Verified!"
- ✅ Receive welcome email
- ✅ Can now sign in

### After Signup (Google)
- ✅ Immediately signed in
- ✅ No verification needed
- ✅ Redirected to homepage

## Troubleshooting

### Not receiving emails?
```bash
# Check Resend dashboard
https://resend.com/emails

# Check spam folder
# Emails come from: onboarding@resend.dev
```

### Can't sign in?
```
Error: "Please verify your email before signing in"
Solution: Check your email and click verification link
```

### Google button not showing?
```bash
# Check your .env file has real credentials
GOOGLE_CLIENT_ID="...apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-..."

# Restart server
npm run dev
```

## Test Checklist

- [ ] Sign up with email/password
- [ ] Receive verification email
- [ ] Click verification link
- [ ] See success page
- [ ] Receive welcome email
- [ ] Sign in with verified account
- [ ] Sign out
- [ ] Sign in with Google
- [ ] Sign out
- [ ] Try signing in without verifying (should fail)

## All Working? 🎉

If all tests pass, your authentication is **100% complete and working!**

You now have:
- ✅ Email/Password with verification
- ✅ Google OAuth
- ✅ Secure token system
- ✅ Beautiful email templates
- ✅ Production-ready auth

**You're ready to build your app!** 🚀
