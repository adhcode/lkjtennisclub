# Email Verification System

## ✅ What's Implemented

Your authentication now includes email verification for users who sign up with email/password:

### User Flow

1. **User signs up** with email and password
2. **Account is created** but not verified yet
3. **Verification email is sent** with a unique link
4. **User clicks the link** in their email
5. **Email is verified** and welcome email is sent
6. **User can now sign in** with their credentials

### Google OAuth Users
- Users who sign in with Google are automatically verified (Google handles email verification)
- No additional verification needed

## 📧 Email Templates

### Verification Email
- Sent immediately after signup
- Contains a verification link
- Link expires in 24 hours
- Styled with your brand colors (#911b1e and #fcf7dc)

### Welcome Email
- Sent after successful verification
- Welcomes the user to the club
- Provides next steps

## 🔐 Security Features

- Verification tokens are cryptographically secure (32 random bytes)
- Tokens expire after 24 hours
- Tokens are deleted after use (one-time use only)
- Users cannot sign in until email is verified
- Expired tokens are automatically cleaned up

## 📁 New Files Created

```
lkjtennisclub/
├── src/
│   ├── lib/
│   │   └── email.ts                           # Email sending functions
│   ├── app/
│   │   ├── api/auth/
│   │   │   ├── register/route.ts              # Updated with verification
│   │   │   └── verify-email/route.ts          # Email verification endpoint
│   │   └── auth/
│   │       ├── check-email/page.tsx           # "Check your email" page
│   │       ├── verify-email/page.tsx          # Verification processing page
│   │       └── verify-success/page.tsx        # Success confirmation page
│   └── lib/
│       └── auth.ts                            # Updated to check verification
```

## 🧪 Testing the Flow

### Test Email Verification

1. **Sign up with a new email:**
   ```
   Go to: http://localhost:3000/auth/signup
   Enter: name, email, password
   Click: Create Account
   ```

2. **Check email page appears:**
   ```
   You'll be redirected to: /auth/check-email
   Message: "Check your email for verification link"
   ```

3. **Check your email inbox:**
   ```
   Look for email from: LKJ Tennis Club <onboarding@resend.dev>
   Subject: "Verify your email address"
   ```

4. **Click the verification link:**
   ```
   Opens: /auth/verify-email?token=...
   Shows: "Verifying your email..." (loading)
   Then redirects to: /auth/verify-success
   ```

5. **Success page:**
   ```
   Shows: "Email Verified! 🎉"
   Auto-redirects to sign in after 5 seconds
   ```

6. **Check for welcome email:**
   ```
   Look for second email: "Welcome to LKJ Tennis Club!"
   ```

7. **Sign in:**
   ```
   Go to: http://localhost:3000/auth/signin
   Enter your credentials
   You can now sign in successfully!
   ```

### Test Unverified User

1. Sign up with email/password
2. Don't click the verification link
3. Try to sign in immediately
4. You'll see error: "Please verify your email before signing in"

### Test Expired Token

1. Sign up with email/password
2. Wait 24 hours (or manually delete the token from database)
3. Try to use the verification link
4. You'll see: "Verification token has expired"

## 🔧 Configuration

### Email Sender

Currently using Resend's default sender:
```
from: 'LKJ Tennis Club <onboarding@resend.dev>'
```

To use your own domain:
1. Verify your domain in Resend dashboard
2. Update `src/lib/email.ts`:
   ```typescript
   from: 'LKJ Tennis Club <noreply@yourdomain.com>'
   ```

### Token Expiry

Default: 24 hours

To change, update `src/app/api/auth/register/route.ts`:
```typescript
const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
```

## 📊 Database

### Verification Tokens Table

Already exists in your schema:
```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
}
```

### User Model

Uses the `emailVerified` field:
```prisma
model User {
  emailVerified DateTime?
  // ... other fields
}
```

## 🎨 Customization

### Email Templates

Edit `src/lib/email.ts` to customize:
- Email subject lines
- HTML templates
- Brand colors
- Content and messaging

### UI Pages

Edit these pages to customize the user experience:
- `/auth/check-email` - After signup
- `/auth/verify-email` - During verification
- `/auth/verify-success` - After successful verification

## 🐛 Troubleshooting

### Not receiving emails

1. **Check Resend dashboard:**
   - Go to: https://resend.com/emails
   - Check delivery status

2. **Check spam folder:**
   - Emails from `onboarding@resend.dev` might go to spam

3. **Verify API key:**
   - Check `.env` has correct `RESEND_API_KEY`
   - Resend free tier: 100 emails/day

### "Please verify your email" error

This is expected! Users must verify their email before signing in.

### Token expired

Users need to sign up again to get a new verification email.

### Email already verified

If a user tries to verify again, they'll see an error. This is normal - they can just sign in.

## 🚀 Production Checklist

- [ ] Verify your domain with Resend
- [ ] Update email sender to use your domain
- [ ] Test email delivery in production
- [ ] Set up email monitoring/alerts
- [ ] Consider adding "Resend verification email" feature
- [ ] Add rate limiting to prevent abuse

## 📈 Future Enhancements

Possible additions:
- Resend verification email button
- Email change with re-verification
- Password reset via email
- Two-factor authentication
- Email preferences/notifications

## 🎉 Summary

Your authentication system now has:
- ✅ Email/Password with verification
- ✅ Google OAuth (auto-verified)
- ✅ Secure token-based verification
- ✅ Beautiful email templates
- ✅ User-friendly verification flow
- ✅ Welcome emails for new users

Users signing up with email/password will receive a verification email and must verify before they can sign in!
