# 🚀 Run These Commands Now!

## Step 1: Seed the Events (Run this in terminal)

```bash
npm run seed-events
```

This will add all 8 events to your database:
1. ✅ DS Energy Tennis Tournament (Featured)
2. ✅ Alimosho Summer Tennis Clinic & Tournament (Featured)
3. ✅ Celebrating Prof. Tayo Ajayi's Inaugural Lecture (Featured)
4. ✅ LKJ Tennis Club vs OTA Tennis Club
5. ✅ Professional Tennis Workshop
6. ✅ New Court Launch Celebration
7. ✅ Health & Wellness Event
8. ✅ Junior Tennis Clinic & Competition

## Step 2: Check Your Site

1. **Homepage**: http://localhost:3000
   - Should show 3 featured events

2. **Admin Panel**: http://localhost:3000/admin/events
   - Should show all 8 events
   - Can filter by status
   - Can edit, delete events

## What You Can Do Now

### ✅ View Events
- Homepage shows featured events dynamically
- Events load from database

### ✅ Edit Events
1. Go to `/admin/events`
2. Click edit icon on any event
3. Change title, description, dates, images
4. Upload new featured image
5. Toggle featured status
6. Change event status (draft/published/cancelled)
7. Save changes

### ✅ Create New Events
1. Go to `/admin/events`
2. Click "Add Event"
3. Fill in all details
4. Upload image
5. Set as featured for homepage
6. Publish

### ✅ Delete Events
1. Go to `/admin/events`
2. Click delete icon
3. Confirm deletion

## Features Working

✅ **Database-driven events** - No more hardcoded data
✅ **Admin management** - Full CRUD operations
✅ **Image uploads** - Cloudinary integration
✅ **Featured events** - Show on homepage
✅ **Status management** - Draft, Published, Cancelled
✅ **Registration tracking** - Track participants
✅ **SEO fields** - Meta titles and descriptions
✅ **Responsive design** - Works on all devices

## Quick Test

```bash
# 1. Seed events
npm run seed-events

# 2. Start dev server (if not running)
npm run dev

# 3. Visit homepage
open http://localhost:3000

# 4. Visit admin
open http://localhost:3000/admin/events
```

## Troubleshooting

**Events not showing?**
- Make sure you ran `npm run seed-events`
- Check events are marked as "published"
- Check events are marked as "featured" for homepage

**Can't edit events?**
- Make sure you're logged in as admin
- Check your admin role in database

**Images not uploading?**
- Check Cloudinary credentials in `.env`
- Make sure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET are set

---

**You're all set! Run `npm run seed-events` and check your site!** 🎾✨
