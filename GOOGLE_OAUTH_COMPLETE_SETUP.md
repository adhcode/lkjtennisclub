# Complete Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "LKJ Tennis Club" and click "Create"

## Step 2: Enable Google+ API

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" and click "Create"
3. Fill in the required fields:
   - App name: `LKJ Tennis Club`
   - User support email: Your email
   - Developer contact email: Your email
4. Click "Save and Continue"
5. On the "Scopes" page, click "Add or Remove Scopes"
6. Add these scopes:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
7. Click "Save and Continue"
8. Add test users (your email addresses) if in testing mode
9. Click "Save and Continue"

## Step 4: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Name it "LKJ Tennis Club Web"
5. Add Authorized JavaScript origins:
   ```
   http://localhost:3000
   https://yourdomain.com (when you deploy)
   ```
6. Add Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google (when you deploy)
   ```
7. Click "Create"
8. Copy the Client ID and Client Secret

## Step 5: Update Your .env File

Replace the placeholder values in your `.env` file:

```env
GOOGLE_CLIENT_ID="your-actual-client-id-here"
GOOGLE_CLIENT_SECRET="your-actual-client-secret-here"
```

## Step 6: Test the Integration

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/auth/signin`

3. Click "Continue with Google"

4. You should be redirected to Google's login page

5. After signing in, you'll be redirected back to your app

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- No trailing slashes
- Check for http vs https

### Error: "Access blocked: This app's request is invalid"
- Make sure you've enabled the Google+ API
- Check that your OAuth consent screen is configured
- Add your email as a test user if the app is in testing mode

### Users can't sign in
- If your app is in "Testing" mode, only test users you've added can sign in
- To allow anyone to sign in, publish your app (go to OAuth consent screen → "Publish App")

## Email Verification Setup

Email verification is already configured using Resend. When users sign in with email:

1. They enter their email address
2. They receive a magic link via email
3. Clicking the link signs them in automatically

The email provider is configured in `src/lib/auth.ts` and uses your Resend API key.

## Security Notes

- Never commit your `.env` file to version control
- Keep your Client Secret secure
- Use environment variables for all sensitive data
- When deploying, add your production domain to Google Console
- Consider enabling 2FA for your Google Cloud account

## Next Steps

Once Google OAuth is working:
1. Test with multiple accounts
2. Check that user data is being saved to your database
3. Verify that the role system works correctly
4. Add your production domain before deploying
