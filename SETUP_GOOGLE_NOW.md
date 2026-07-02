# Set Up Google OAuth Right Now (5 Minutes)

## ✅ What I Just Fixed

1. **Fixed the React error** - Changed `useState` to `useEffect` 
2. **Enabled Google button** - It will show automatically when you add credentials
3. **Made it smart** - Button only appears when Google OAuth is properly configured

## 🚀 Set Up Google OAuth Now

### Step 1: Open Google Cloud Console
Go to: https://console.cloud.google.com/

### Step 2: Create a New Project
1. Click "Select a project" (top left)
2. Click "NEW PROJECT"
3. Project name: `LKJ Tennis Club`
4. Click "CREATE"
5. Wait for it to create (about 10 seconds)
6. Make sure the new project is selected

### Step 3: Configure OAuth Consent Screen
1. In the left menu, go to: **APIs & Services** → **OAuth consent screen**
2. Select: **External**
3. Click "CREATE"
4. Fill in the form:
   - App name: `LKJ Tennis Club`
   - User support email: (select your email from dropdown)
   - Developer contact email: (type your email)
5. Click "SAVE AND CONTINUE"
6. On "Scopes" page: Click "SAVE AND CONTINUE" (skip this)
7. On "Test users" page: Click "SAVE AND CONTINUE" (skip this)
8. On "Summary" page: Click "BACK TO DASHBOARD"

### Step 4: Create OAuth Credentials
1. In the left menu, go to: **APIs & Services** → **Credentials**
2. Click "CREATE CREDENTIALS" (top)
3. Select: **OAuth client ID**
4. Application type: **Web application**
5. Name: `LKJ Tennis Club Web`
6. Under "Authorized redirect URIs":
   - Click "ADD URI"
   - Paste EXACTLY: `http://localhost:3000/api/auth/callback/google`
   - Make sure there's NO trailing slash
7. Click "CREATE"

### Step 5: Copy Your Credentials
A popup will appear with your credentials:
- **Client ID** - looks like: `123456789-abc123.apps.googleusercontent.com`
- **Client secret** - looks like: `GOCSPX-abc123xyz`

**Keep this popup open!**

### Step 6: Update Your .env File
Open `lkjtennisclub/.env` and replace these lines:

```env
GOOGLE_CLIENT_ID="paste-your-client-id-here"
GOOGLE_CLIENT_SECRET="paste-your-client-secret-here"
```

With your actual credentials (keep the quotes):

```env
GOOGLE_CLIENT_ID="123456789-abc123.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123xyz"
```

### Step 7: Restart Your Server
In your terminal:
```bash
# Press Ctrl+C to stop the server
# Then restart:
npm run dev
```

### Step 8: Test It!
1. Go to: http://localhost:3000/auth/signin
2. You should now see "Continue with Google" button
3. Click it
4. Sign in with your Google account
5. You'll be redirected back and signed in!

## ✅ That's It!

The Google button will automatically appear on both:
- Sign in page: http://localhost:3000/auth/signin
- Sign up page: http://localhost:3000/auth/signup

## 🐛 Troubleshooting

### "redirect_uri_mismatch" error
- Go back to Google Console → Credentials
- Edit your OAuth client
- Make sure the redirect URI is EXACTLY: `http://localhost:3000/api/auth/callback/google`
- No `https`, no trailing slash

### Button still not showing
- Check your .env file has the correct credentials
- Make sure you restarted the server
- Check browser console for errors

### "Access blocked: This app's request is invalid"
- Go to OAuth consent screen
- Add yourself as a test user
- Or click "PUBLISH APP"

## 📝 For Production Later

When you deploy your site:
1. Go back to Google Console → Credentials
2. Edit your OAuth client
3. Add your production URL:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
4. Update your production .env:
   ```
   NEXTAUTH_URL="https://yourdomain.com"
   ```

## 🎉 You're Done!

Your authentication now supports:
- ✅ Email/Password
- ✅ Google OAuth

Both work perfectly!
