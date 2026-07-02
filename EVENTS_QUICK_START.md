# 🎾 Events System - Quick Start

## 🚀 Setup (3 Steps)

### 1. Create Database Tables
```bash
cd lkjtennisclub
npx prisma db push
```

### 2. Seed Sample Events
```bash
npm run seed-events
```

### 3. Start Development Server
```bash
npm run dev
```

## 📍 Access Points

- **Admin Panel**: http://localhost:3000/admin/events
- **Homepage**: Events section loads dynamically
- **Create Event**: http://localhost:3000/admin/events/new

## ✨ What You Get

### 4 Sample Events Created:
1. **Prof. Tayo Inaugural Lecture** - Free, Featured
2. **DS Energy Tournament** - ₦20,000, Featured
3. **Summer Tennis Camp** - ₦75,000, Featured
4. **Monthly Club Social** - Free

### Admin Features:
- ✅ Create, edit, delete events
- ✅ Upload event images
- ✅ Manage registration settings
- ✅ Track participant counts
- ✅ Filter by status
- ✅ Feature events on homepage

### Frontend Features:
- ✅ Dynamic event loading
- ✅ Featured events section
- ✅ Responsive design
- ✅ Loading states
- ✅ Empty states

## 🎯 Quick Actions

### Create a New Event
1. Go to `/admin/events`
2. Click "Add Event"
3. Fill form and upload image
4. Set status to "published"
5. Check "Featured" for homepage
6. Save

### Edit an Event
1. Go to `/admin/events`
2. Click edit icon
3. Modify fields
4. Save changes

### Feature an Event on Homepage
1. Edit event
2. Check "Featured Event" checkbox
3. Set status to "Published"
4. Save

## 📊 Event Fields

**Required:**
- Title
- Slug (auto-generated)
- Start Date

**Optional:**
- Description
- Content (HTML)
- End Date
- Location
- Price (0 = Free)
- Max Participants
- Featured Image
- Registration settings
- SEO fields

## 🔑 Key Commands

```bash
# Create tables
npx prisma db push

# Seed events
npm run seed-events

# View database
npx prisma studio

# Generate Prisma client
npx prisma generate
```

## 🎨 Status Options

- **Draft** - Not visible to public
- **Published** - Live and visible
- **Cancelled** - Event cancelled

## 💡 Pro Tips

1. **Auto-slug**: Title automatically generates URL slug
2. **Featured**: Check to show on homepage (max 3)
3. **Free Events**: Set price to 0
4. **Unlimited**: Leave max participants empty
5. **Images**: Use Cloudinary upload button

## 🐛 Quick Fixes

**Events not showing?**
- Check status is "published"
- Check "featured" is checked
- Refresh page

**Can't create events?**
- Verify admin login
- Check role in database

**Images not uploading?**
- Check Cloudinary env vars
- Verify `.env` file

## 📚 Full Documentation

See `EVENTS_SETUP_GUIDE.md` for complete documentation.

---

**Ready to go!** Run the 3 setup commands above and start managing events. 🎾✨
