# Authentication Testing Guide

## Current Status ✅

Your authentication system is now set up with:
- ✅ Email/Password authentication (working)
- ✅ Google OAuth (needs credentials)
- ✅ Email verification with magic links (needs testing)

## Quick Setup Steps

### 1. Google OAuth Setup (5 minutes)

Follow the detailed guide in `GOOGLE_OAUTH_COMPLETE_SETUP.md` or quick steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Configure OAuth consent screen
5. Create OAuth credentials
6. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Secret to your `.env` file

### 2. Test Email Verification

Your Resend API key is already configured. To test:

1. Go to `http://localhost:3000/auth/signin`
2. Enter your email address
3. Click "Sign in with Email Link"
4. Check your email for the magic link
5. Click the link to sign in

**Note:** Resend's free tier uses `onboarding@resend.dev` as the sender. To use your own domain:
- Verify your domain in Resend dashboard
- Update the `from` field in `src/lib/auth.ts`

## Testing Checklist

### Email/Password Authentication ✅
- [x] Sign up with new account
- [x] Sign in with existing account
- [x] Error handling for invalid credentials
- [x] Password validation (min 8 characters)
- [x] Duplicate email prevention

### Google OAuth (After setup)
- [ ] Click "Continue with Google" on sign-in page
- [ ] Authorize with Google account
- [ ] Verify redirect back to app
- [ ] Check user is created in database
- [ ] Test sign out and sign in again

### Email Magic Link
- [ ] Enter email on sign-in page
- [ ] Click "Sign in with Email Link"
- [ ] Receive email with magic link
- [ ] Click link and verify sign-in
- [ ] Check link expires after 24 hours

### User Roles
- [ ] New users get "member" role by default
- [ ] Admin users can access `/admin` routes
- [ ] Non-admin users are redirected from admin pages

### Session Management
- [ ] User stays signed in after page refresh
- [ ] Sign out works correctly
- [ ] Protected routes redirect to sign-in
- [ ] Redirect back to original page after sign-in

## Common Issues & Solutions

### Google OAuth Errors

**"redirect_uri_mismatch"**
```
Solution: Ensure redirect URI in Google Console is exactly:
http://localhost:3000/api/auth/callback/google
```

**"Access blocked: This app's request is invalid"**
```
Solution: 
1. Enable Google+ API
2. Configure OAuth consent screen
3. Add yourself as a test user
```

### Email Issues

**Not receiving emails**
```
Solution:
1. Check spam folder
2. Verify RESEND_API_KEY in .env
3. Check Resend dashboard for delivery status
```

**"Failed to send email"**
```
Solution:
1. Verify Resend API key is valid
2. Check you haven't exceeded free tier limits (100 emails/day)
3. Restart your dev server after .env changes
```

### Database Issues

**"User already exists"**
```
Solution: This is expected behavior. Use sign-in instead.
```

**Session not persisting**
```
Solution:
1. Check NEXTAUTH_SECRET is set in .env
2. Clear browser cookies
3. Restart dev server
```

## Environment Variables Checklist

Make sure your `.env` file has all these:

```env
# Database
DATABASE_URL="your-database-url"
DIRECT_URL="your-direct-url"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Resend (Email)
RESEND_API_KEY="re_..."

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

## Next Steps

1. **Set up Google OAuth** - Follow `GOOGLE_OAUTH_COMPLETE_SETUP.md`
2. **Test all authentication methods** - Use the checklist above
3. **Configure email domain** - Set up your domain in Resend (optional)
4. **Add admin user** - Manually update a user's role to "admin" in database
5. **Deploy** - Add production URLs to Google Console and update .env

## Making a User Admin

To make a user an admin, run this in your database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

Or use Prisma Studio:
```bash
npx prisma studio
```

Then navigate to the `users` table and change the role field to "admin".

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set
4. Restart the dev server
5. Clear browser cache and cookies
