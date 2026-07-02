# Google OAuth Setup Guide

## Get Google OAuth Credentials

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create a New Project (or select existing)
- Click "Select a project" at the top
- Click "NEW PROJECT"
- Name: "LKJ Tennis Club"
- Click "CREATE"

### 3. Enable Google+ API
- In the left sidebar, go to "APIs & Services" > "Library"
- Search for "Google+ API"
- Click on it and click "ENABLE"

### 4. Configure OAuth Consent Screen
- Go to "APIs & Services" > "OAuth consent screen"
- Select "External" (unless you have Google Workspace)
- Click "CREATE"

Fill in:
- **App name**: LKJ Tennis Club
- **User support email**: your-email@gmail.com
- **Developer contact**: your-email@gmail.com
- Click "SAVE AND CONTINUE"

Scopes:
- Click "ADD OR REMOVE SCOPES"
- Select: `email`, `profile`, `openid`
- Click "UPDATE" then "SAVE AND CONTINUE"

Test users (for development):
- Add your email address
- Click "SAVE AND CONTINUE"

### 5. Create OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "CREATE CREDENTIALS" > "OAuth client ID"
- Application type: "Web application"
- Name: "LKJ Tennis Club Web"

**Authorized JavaScript origins**:
- Development: `http://localhost:3000`
- Production: `https://lkjtennisclub.com`

**Authorized redirect URIs**:
- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://lkjtennisclub.com/api/auth/callback/google`

- Click "CREATE"

### 6. Copy Credentials
You'll see a popup with:
- **Client ID**: Copy this
- **Client Secret**: Copy this

### 7. Add to .env
```env
GOOGLE_CLIENT_ID="your-client-id-here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret-here"
```

### 8. Restart Dev Server
```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

## Testing

1. Go to http://localhost:3000/auth/signin
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should be redirected back and logged in!

## Production Setup

When deploying to production:

1. Update OAuth consent screen to "Published" status
2. Add production URLs to authorized origins and redirect URIs
3. Update `.env` with production domain:
   ```env
   BETTER_AUTH_URL="https://lkjtennisclub.com"
   NEXT_PUBLIC_BASE_URL="https://lkjtennisclub.com"
   ```

## Troubleshooting

### "redirect_uri_mismatch" error
- Make sure the redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- No trailing slash
- Check for typos

### "Access blocked" error
- Add your email to test users in OAuth consent screen
- Make sure app is in "Testing" mode for development

### Google button not working
- Check browser console for errors
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Restart dev server after adding credentials

## Security Notes

- Never commit `.env` file to git
- Keep Client Secret private
- Use different credentials for development and production
- Regularly rotate secrets in production
