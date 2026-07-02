# User Profile System

## ✅ What's Implemented

A complete user profile system where users can view and edit their account information, and link their club membership to their account.

## 📁 Pages Created

### 1. Profile Page (`/profile`)
- View account information
- Display user avatar (initial letter)
- Show account type (Member/Admin badge)
- Display linked membership information (if member)
- Banner prompting non-members to link membership
- Quick action cards for:
  - Shop
  - Events
  - Membership
  - Admin Panel (for admins only)

### 2. Edit Profile Page (`/profile/edit`)
- Edit full name
- Email displayed (cannot be changed)
- Save/Cancel buttons
- Success/error messages
- Auto-redirect after save

### 3. Link Membership Page (`/profile/link-membership`)
- **Step 1:** Enter membership ID
- **Step 2:** Verify with email code
- **Step 3:** Success confirmation
- Resend code functionality
- Visual step indicator

## 🎨 Features

### Profile Display
- **Avatar:** Circle with user's initial
- **Name:** User's full name
- **Email:** User's email address
- **Role Badge:** Member 🎾 or Customer 🛍️
- **Membership Info:** Shows membership ID, status, type, join date (for members)
- **Quick Actions:** Links to main features

### Membership Linking Flow
1. **Enter Membership ID:** User enters their membership ID (e.g., LKJ-2025-001)
2. **Lookup Member:** System finds member record and sends verification code to email
3. **Email Verification:** User receives 6-digit code via email
4. **Verify Code:** User enters code to confirm ownership
5. **Link Account:** System links membership to user account
6. **Success:** User is redirected to profile with membership info displayed

### Security Features
- **Email Verification:** Code sent to member's email on file
- **Code Expiration:** Codes expire after 10 minutes
- **Duplicate Prevention:** Cannot link membership already linked to another account
- **Resend Code:** Users can request a new code if needed

### Profile Editing
- **Name Field:** Editable text input
- **Email Field:** Disabled (cannot change)
- **Validation:** Name is required
- **Feedback:** Success/error messages
- **Auto-redirect:** Returns to profile after save

### Navigation
- **Navbar:** Click on your name to go to profile
- **Mobile Menu:** "My Profile" link
- **Profile Page:** "Edit Profile" and "Link Membership" buttons
- **Edit Page:** "Cancel" button returns to profile

## 🔐 Security

- **Authentication Required:** Must be signed in
- **Auto-redirect:** Redirects to sign-in if not authenticated
- **Session-based:** Uses NextAuth session
- **Server-side validation:** API validates all updates
- **Email verification:** Confirms member ownership via email
- **Code expiration:** Verification codes expire after 10 minutes
- **Duplicate check:** Prevents linking already-linked memberships

## 🚀 Usage

### View Profile
```
1. Sign in to your account
2. Click your name in the navbar
3. View your profile information
```

### Link Membership
```
1. Go to your profile
2. Click "Link Membership" button
3. Enter your membership ID (found on your ID card)
4. Check your email for verification code
5. Enter the 6-digit code
6. Click "Verify & Link"
7. Success! Your membership is now linked
```

### Edit Profile
```
1. Go to your profile
2. Click "Edit Profile"
3. Update your name
4. Click "Save Changes"
5. Automatically redirected back to profile
```

### Quick Actions
```
From your profile, click any quick action card:
- Shop → Browse products
- Events → View events (members only)
- Membership → Join the club (non-members)
- Admin Panel → Manage site (admins only)
```

## 📊 API Endpoints

### Update Profile
```
PUT /api/user/update
Body: { name: string }
Auth: Required
Returns: Updated user object
```

### Get Member Data
```
GET /api/user/member-data
Auth: Required
Returns: Member information if linked, null otherwise
```

### Lookup Membership
```
POST /api/membership/lookup
Body: { membershipId: string }
Auth: Required
Returns: Member info (masked) and sends verification email
```

### Verify and Link Membership
```
POST /api/membership/verify-link
Body: { membershipId: string, verificationCode: string }
Auth: Required
Returns: Success message and linked member info
```

## 📧 Email Templates

### Membership Verification Email
- Sent when user requests to link membership
- Contains 6-digit verification code
- Shows membership ID being linked
- Expires in 10 minutes
- Styled with club branding

## 🎨 Design

### Colors
- Background: `#fcf7dc` (cream)
- Primary: `#911b1e` (maroon)
- Text: `#911b1e` with opacity variants
- Buttons: Maroon background, cream text

### Layout
- **Desktop:** 3-column grid (avatar + info cards)
- **Mobile:** Stacked single column
- **Responsive:** Adapts to all screen sizes

### Components
- Profile card with avatar
- Information cards
- Quick action grid
- Edit form with validation
- Step indicator for membership linking
- Email verification input

## 🔄 User Flow

### First Time User (Non-Member)
```
1. Sign up/Sign in
2. Click name in navbar
3. See profile with "Link Membership" banner
4. Browse shop or join club
```

### First Time User (Existing Member)
```
1. Sign up/Sign in
2. Click name in navbar
3. Click "Link Membership"
4. Enter membership ID
5. Check email for code
6. Enter verification code
7. Success! Membership linked
8. View membership info on profile
```

### Returning Member
```
1. Sign in
2. Click name in navbar
3. View membership information
4. Access member-only features
5. View QR code
```

## 💡 Future Enhancements

Possible additions:
- Profile picture upload
- Change password
- Email preferences
- Notification settings
- Order history
- Event registrations
- Membership renewal
- Activity log
- SMS verification option
- Multiple memberships per user

## 🧪 Testing

### Test Profile View
```
1. Sign in
2. Go to: http://localhost:3000/profile
3. Verify all information displays correctly
4. Check quick action links work
5. Verify admin panel shows for admins only
```

### Test Membership Linking
```
1. Create a test member in admin panel
2. Sign in with a different user account
3. Go to profile
4. Click "Link Membership"
5. Enter test member's membership ID
6. Check email for verification code
7. Enter code and verify
8. Confirm membership info appears on profile
9. Test resend code functionality
```

### Test Profile Edit
```
1. Go to profile
2. Click "Edit Profile"
3. Change your name
4. Click "Save Changes"
5. Verify success message
6. Verify redirect to profile
7. Verify name updated in navbar
```

### Test Navigation
```
1. Click name in navbar → Goes to profile
2. Click "Edit Profile" → Goes to edit page
3. Click "Cancel" → Returns to profile
4. Mobile menu → "My Profile" works
5. Click "Link Membership" → Goes to linking page
```

## 📱 Mobile Experience

- Responsive design
- Touch-friendly buttons
- Stacked layout
- Easy navigation
- Quick actions grid adapts
- Step indicator works on mobile
- Email code input optimized for mobile

## 🎉 Summary

Your profile system includes:
- ✅ View profile page
- ✅ Edit profile page
- ✅ Link membership page
- ✅ Email verification flow
- ✅ Member data API endpoint
- ✅ Update API endpoint
- ✅ Navbar integration
- ✅ Mobile menu integration
- ✅ Quick action cards
- ✅ Role-based features
- ✅ Membership status display
- ✅ Responsive design
- ✅ Authentication protection
- ✅ Success/error feedback
- ✅ Resend code functionality
- ✅ Code expiration handling

Users can now manage their account information and link their club membership easily!
