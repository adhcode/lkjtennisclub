# Google OAuth Setup - Quick Reference

## 🚀 Quick Start (5 minutes)

### Step 1: Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create Project
1. Click "Select a project" → "New Project"
2. Name: "LKJ Tennis Club"
3. Click "Create"

### Step 3: Enable API
1. Go to: APIs & Services → Library
2. Search: "Google+ API"
3. Click "Enable"

### Step 4: OAuth Consent Screen
1. Go to: APIs & Services → OAuth consent screen
2. Choose: "External"
3. Fill in:
   - App name: `LKJ Tennis Club`
   - User support email: `your-email@example.com`
   - Developer email: `your-email@example.com`
4. Click "Save and Continue" through all steps

### Step 5: Create Credentials
1. Go to: APIs & Services → Credentials
2. Click: "Create Credentials" → "OAuth client ID"
3. Type: "Web application"
4. Name: "LKJ Tennis Club Web"
5. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Click "Create"
7. **Copy the Client ID and Client Secret**

### Step 6: Update .env
Replace these lines in your `.env` file:

```env
GOOGLE_CLIENT_ID="paste-your-client-id-here"
GOOGLE_CLIENT_SECRET="paste-your-client-secret-here"
```

### Step 7: Restart Server
```bash
# Stop your server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 8: Test
1. Go to: http://localhost:3000/auth/signin
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should be redirected back to your app!

## 🎯 Important URLs

**Authorized JavaScript origins:**
```
http://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
```

## 🔧 For Production

When you deploy, add these to Google Console:

**Authorized JavaScript origins:**
```
https://yourdomain.com
```

**Authorized redirect URIs:**
```
https://yourdomain.com/api/auth/callback/google
```

## ⚠️ Common Mistakes

❌ **Wrong:** `http://localhost:3000/api/auth/callback/google/`  
✅ **Right:** `http://localhost:3000/api/auth/callback/google`

❌ **Wrong:** Using `https` for localhost  
✅ **Right:** Using `http` for localhost

❌ **Wrong:** Forgetting to enable Google+ API  
✅ **Right:** Enable it in APIs & Services → Library

## 📧 Email Verification

Email verification is already set up! To test:

1. Go to sign-in page
2. Enter your email
3. Click "Sign in with Email Link"
4. Check your email
5. Click the magic link

**Note:** Emails come from `onboarding@resend.dev` (Resend's default sender)

## 🎉 You're Done!

Your authentication system now supports:
- ✅ Email/Password
- ✅ Google OAuth
- ✅ Magic Link Email

Test all three methods to make sure everything works!
