# Simple QR Code Recovery - Step by Step

## THE GOOD NEWS! ✅

Your QR codes will work again! The system looks up members by their **membershipId** (like LKJ-2025-001), NOT by database ID.

So if you recreate members with the same membershipId, the QR codes will work immediately!

## What You Need

1. **Scan the QR codes** on the printed cards
2. Each QR code shows a URL like: `https://lkjtennisclub.com/member/LKJ-2025-001`
3. Write down the membershipId from each URL (the part after `/member/`)

## Recovery Steps

### Step 1: Gather Membership IDs

Scan each printed ID card and write down:
- Membership ID (e.g., LKJ-2025-001)
- Member name (if you remember or if it's on the card)

### Step 2: Go to Admin Panel

```
http://localhost:3000/admin/members
```

### Step 3: Add Each Member

For each member:

1. Click "Add New Member"
2. **IMPORTANT:** In the "Membership ID" field, enter the EXACT ID from the QR code
   - Example: `LKJ-2025-001`
3. Fill in other details (name, email, phone, etc.)
4. Click "Save"

### Step 4: Test the QR Code

1. Scan the QR code
2. It should now show the member profile!
3. ✅ QR code works again!

## Example

If a QR code shows:
```
https://lkjtennisclub.com/member/LKJ-2025-001
```

When you add the member in admin panel:
- Membership ID: `LKJ-2025-001` ← Must match exactly!
- First Name: John
- Last Name: Doe
- Email: john@example.com
- etc.

Save it, and the QR code will work!

## Bulk Recovery Script

If you have many members, edit this file:
```
scripts/restore-members-with-ids.ts
```

Add your members like this:
```typescript
const membersToRestore = [
  {
    membershipId: 'LKJ-2025-001',  // ← From QR code
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
  // Add more members...
];
```

Then run:
```bash
npx tsx scripts/restore-members-with-ids.ts
```

## Key Point

The membershipId MUST match what's in the QR code EXACTLY:
- ✅ `LKJ-2025-001` matches `LKJ-2025-001`
- ❌ `LKJ-2025-1` does NOT match `LKJ-2025-001`
- ❌ `lkj-2025-001` does NOT match `LKJ-2025-001`

## Test It

1. Add one member with the correct membershipId
2. Scan that member's QR code
3. If it works, continue with the rest!

## You're Saved! 🎉

The QR codes will work again once you recreate the members with the same membershipIds!
