# Authentication System - Quick Start

## ✅ What Works Right Now

Your authentication system is **fully functional** with email/password:

1. Go to http://localhost:3000/auth/signup
2. Create an account
3. Sign in and out
4. Access protected routes

## 🎯 Three Authentication Options

### 1. Email/Password (Working Now) ✅
- Users create account with email and password
- Passwords are securely hashed
- **No setup needed - works immediately**

### 2. Google OAuth (Optional - 5 min setup) ⏳
- Users sign in with their Google account
- No password needed
- **Requires Google Cloud Console setup**
- Follow: `GOOGLE_OAUTH_SIMPLE_SETUP.md`

### 3. Magic Link Email (Removed for now)
- Passwordless login via email link
- Can be added back later if needed

## 🚀 Quick Start

### Test Authentication Now
```bash
# Your server should be running
npm run dev

# Then visit:
# http://localhost:3000/auth/signup
```

### Add Google OAuth (Optional)
```bash
# 1. Follow GOOGLE_OAUTH_SIMPLE_SETUP.md (5 minutes)
# 2. Get credentials from Google Cloud Console
# 3. Add to .env file
# 4. Uncomment Google button in signin/signup pages
# 5. Restart server
```

## 📁 Key Files

```
lkjtennisclub/
├── src/
│   ├── lib/
│   │   └── auth.ts                    # Main auth configuration
│   ├── app/
│   │   ├── api/auth/
│   │   │   ├── [...nextauth]/route.ts # NextAuth API handler
│   │   │   └── register/route.ts      # Registration endpoint
│   │   └── auth/
│   │       ├── signin/page.tsx        # Sign in page
│   │       └── signup/page.tsx        # Sign up page
│   └── middleware.ts                  # Route protection
├── prisma/
│   └── schema.prisma                  # Database models
└── .env                               # Environment variables
```

## 🔐 Environment Variables

Your `.env` file needs:

```env
# Database (already configured)
DATABASE_URL="..."
DIRECT_URL="..."

# NextAuth (already configured)
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional - add when ready)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

## 🎨 User Interface

### Sign Up Page
- `/auth/signup`
- Email, password, confirm password
- Auto sign-in after registration
- Link to sign in page

### Sign In Page
- `/auth/signin`
- Email and password
- Link to sign up page
- (Google button when enabled)

### Protected Routes
- `/admin/*` - Requires admin role
- Automatically redirects to sign in if not authenticated

## 👤 User Roles

### Member (Default)
- All new users get "member" role
- Can access public and member areas
- Cannot access admin routes

### Admin
- Full access to admin panel
- Can manage products, orders, members
- **To make a user admin:**
  ```sql
  UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
  ```
  Or use Prisma Studio: `npx prisma studio`

## 📊 Database Models

### User
- id, email, password (hashed), name, role
- Links to Account, Session, Member

### Account
- OAuth provider accounts (Google, etc.)
- Linked to User

### Session
- User sessions
- Managed by NextAuth

## 🧪 Testing Checklist

- [ ] Sign up with new email/password
- [ ] Sign in with existing account
- [ ] Sign out
- [ ] Try accessing `/admin` (should redirect)
- [ ] Make user admin and access `/admin`
- [ ] (Optional) Set up and test Google OAuth

## 🐛 Common Issues

### "Invalid email or password"
✅ **Solution:** Check credentials, passwords are case-sensitive

### "User already exists"
✅ **Solution:** Email is registered, use sign in instead

### Google OAuth timeout
✅ **Solution:** Google credentials not set up yet (this is normal)

### Can't access admin routes
✅ **Solution:** Update user role to "admin" in database

## 📚 Documentation

- `AUTH_STATUS.md` - Current status and what's working
- `GOOGLE_OAUTH_SIMPLE_SETUP.md` - Google OAuth setup guide
- `AUTH_TESTING_GUIDE.md` - Comprehensive testing guide
- `ADMIN_GUIDE.md` - Admin features documentation

## 🎉 Summary

**Right now:**
- ✅ Email/password authentication works perfectly
- ✅ User registration and login functional
- ✅ Protected routes working
- ✅ Role-based access control ready

**Optional next step:**
- ⏳ Add Google OAuth (5 minutes, follow simple guide)

**You're all set to use authentication in your app!**
