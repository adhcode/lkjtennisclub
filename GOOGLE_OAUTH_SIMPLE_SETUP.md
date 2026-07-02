# Google OAuth - Simple 5-Minute Setup

## Current Status
- ✅ Email/Password authentication is working
- ⏳ Google OAuth needs credentials

## Setup Google OAuth (5 minutes)

### 1. Go to Google Cloud Console
https://console.cloud.google.com/

### 2. Create a Project
- Click "Select a project" → "New Project"
- Name: "LKJ Tennis Club"
- Click "Create"

### 3. Configure OAuth
- Go to: **APIs & Services** → **OAuth consent screen**
- Choose: **External**
- Fill in:
  - App name: `LKJ Tennis Club`
  - User support email: your email
  - Developer email: your email
- Click "Save and Continue" (skip scopes, test users)

### 4. Create Credentials
- Go to: **APIs & Services** → **Credentials**
- Click: **Create Credentials** → **OAuth client ID**
- Type: **Web application**
- Name: `LKJ Tennis Club Web`
- **Authorized redirect URIs:** Add this EXACTLY:
  ```
  http://localhost:3000/api/auth/callback/google
  ```
- Click "Create"

### 5. Copy Your Credentials
You'll see a popup with:
- Client ID (looks like: `123456789-abc.apps.googleusercontent.com`)
- Client Secret (looks like: `GOCSPX-abc123`)

### 6. Update Your .env File
Replace these lines in `lkjtennisclub/.env`:

```env
GOOGLE_CLIENT_ID="paste-your-client-id-here"
GOOGLE_CLIENT_SECRET="paste-your-client-secret-here"
```

### 7. Restart Your Server
```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### 8. Uncomment Google Button
In `lkjtennisclub/src/app/auth/signin/page.tsx`, find the commented section (around line 120) and uncomment it.

Also do the same in `lkjtennisclub/src/app/auth/signup/page.tsx`.

### 9. Test It!
1. Go to: http://localhost:3000/auth/signin
2. You should now see "Continue with Google" button
3. Click it and sign in with your Google account
4. You'll be redirected back and signed in!

## That's It!

Your auth system now supports:
- ✅ Email/Password (working now)
- ✅ Google OAuth (after setup)

## For Production

When you deploy, add your production URL to Google Console:
```
https://yourdomain.com/api/auth/callback/google
```

And update your production .env:
```env
NEXTAUTH_URL="https://yourdomain.com"
```

## Troubleshooting

**"redirect_uri_mismatch" error?**
- Make sure the redirect URI is EXACTLY: `http://localhost:3000/api/auth/callback/google`
- No trailing slash
- Use `http` not `https` for localhost

**Button still not showing?**
- Make sure you uncommented the Google button code
- Restart your dev server
- Check your .env file has the correct credentials

**"Access blocked" error?**
- Add yourself as a test user in OAuth consent screen
- Or publish your app (OAuth consent screen → Publish App)
