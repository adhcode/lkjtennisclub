# URGENT: QR Code Recovery Guide

## The Situation

You have printed ID cards with QR codes that link to member profiles. The member data was deleted from the database, so the QR codes no longer work.

## The Solution

We need to restore the member data with the EXACT same IDs so the QR codes work again.

## Recovery Options (In Order of Priority)

### Option 1: Neon Database Restore (BEST OPTION) ⭐

Neon automatically backs up your database. This will restore EVERYTHING exactly as it was.

**Steps:**
1. Go to: https://console.neon.tech/
2. Sign in with your account
3. Select your project (the one with your database)
4. Look for one of these options:
   - **"Restore"** button
   - **"Point-in-time restore"**
   - **"Branches"** → Create branch from earlier time
   - **"History"** or **"Backups"**
5. Select a restore point from BEFORE the deletion
6. Restore the database

**This is the BEST option because:**
- ✅ Restores ALL data exactly as it was
- ✅ Preserves all IDs
- ✅ QR codes will work immediately
- ✅ No manual work needed

### Option 2: Restore from Your Records

If you have a list of members (spreadsheet, document, photos of cards), we can recreate them.

**What We Need:**
- Membership IDs (e.g., LKJ-2025-001, LKJ-2025-002, etc.)
- Member names
- Contact information (email, phone)
- Join dates

**Steps:**
1. Gather all member information you have
2. Edit `scripts/restore-members-with-ids.ts`
3. Add each member's data
4. Run: `npx tsx scripts/restore-members-with-ids.ts`

**Important:** The membershipId MUST match what's in the QR code!

### Option 3: Scan QR Codes to Get IDs

If you have the printed cards:

1. Scan each QR code
2. The URL will be: `https://yourdomain.com/member/[membershipId]`
3. Extract the membershipId from each URL
4. Use those IDs to recreate the members

## What the QR Codes Contain

Your QR codes link to URLs like:
```
https://lkjtennisclub.com/member/LKJ-2025-001
https://lkjtennisclub.com/member/LKJ-2025-002
etc.
```

The important part is the **membershipId** at the end (e.g., LKJ-2025-001).

## How to Use the Recovery Script

### Step 1: Gather Member Data

Create a list with:
- Membership ID (from QR code or your records)
- First Name
- Last Name
- Email
- Phone
- Join Date

### Step 2: Edit the Recovery Script

Open: `scripts/restore-members-with-ids.ts`

Add your members like this:
```typescript
const membersToRestore = [
  {
    membershipId: 'LKJ-2025-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    membershipType: 'regular',
    membershipStatus: 'active',
    joinDate: new Date('2025-01-01'),
    expiryDate: new Date('2025-12-31'),
    joinedYear: 2025,
  },
  {
    membershipId: 'LKJ-2025-002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '+234 802 345 6789',
    membershipType: 'regular',
    membershipStatus: 'active',
    joinDate: new Date('2025-01-05'),
    expiryDate: new Date('2025-12-31'),
    joinedYear: 2025,
  },
  // Add more members...
];
```

### Step 3: Run the Script

```bash
npx tsx scripts/restore-members-with-ids.ts
```

### Step 4: Test QR Codes

Scan a QR code and verify it works!

## Prevention for Future

### 1. Regular Backups

Create a backup script:
```bash
# Add to package.json scripts:
"backup": "npx prisma db pull && echo 'Backup created'"
```

### 2. Export Member Data

Before any database changes:
```bash
# Go to admin panel
http://localhost:3000/admin/members

# Export to CSV or take screenshots
```

### 3. Use Neon Branches

For testing, create a branch:
```bash
# In Neon console, create a branch
# Test changes there first
# Only apply to main when confirmed
```

## Immediate Action Items

1. **CHECK NEON BACKUPS** (Do this first!)
   - https://console.neon.tech/
   - Look for restore options
   - This is the fastest solution

2. **Gather Member Information**
   - Check emails for member registrations
   - Check any spreadsheets or documents
   - Scan QR codes to get membership IDs
   - Ask members for their information

3. **Contact Members**
   - If you have their contact info elsewhere
   - Ask them to provide their details again
   - Explain the situation

4. **Worst Case: Reprint Cards**
   - If we can't restore exact IDs
   - Recreate members in admin panel
   - Generate new QR codes
   - Reprint ID cards

## Need Help?

Provide me with:
1. Result from Neon backup check
2. Any member data you have (names, IDs, etc.)
3. How many members were affected
4. Any other information sources

We WILL recover this! 💪

## Quick Check

Run this to see current database state:
```
http://localhost:3000/api/check-data
```

This shows what data still exists.
