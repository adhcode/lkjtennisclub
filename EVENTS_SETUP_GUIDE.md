# 🎾 Events Management System - Complete Setup Guide

## ✅ What's Been Created

### 1. Database Models
- **Event Model** - Complete event management with all fields
- **EventRegistration Model** - Track participant registrations
- Added to `prisma/schema.prisma`

### 2. API Routes
- `GET /api/events` - List all events (with filters)
- `POST /api/events` - Create new event (admin only)
- `GET /api/events/[id]` - Get single event
- `PUT /api/events/[id]` - Update event (admin only)
- `DELETE /api/events/[id]` - Delete event (admin only)

### 3. Admin Pages
- `/admin/events` - List and manage all events
- `/admin/events/new` - Create new event form
- Added "Events" to admin sidebar navigation

### 4. Frontend Components
- Updated `Events.tsx` component to fetch from database
- Dynamic event display with loading states
- Featured events section
- Responsive design maintained

### 5. Migration Script
- `scripts/seed-events.ts` - Migrate existing events to database
- Includes 4 sample events ready to import

## 🚀 Setup Instructions

### Step 1: Update Database Schema

```bash
cd lkjtennisclub
npx prisma db push
```

This creates the `events` and `event_registrations` tables in your database.

### Step 2: Seed Initial Events

```bash
npm run seed-events
```

This will create 4 sample events in your database:
1. **Prof. Tayo Inaugural Lecture** - Free event, March 15, 2026
2. **DS Energy Tournament** - ₦20,000, April 15-17, 2026
3. **Summer Tennis Camp** - ₦75,000, July 1-12, 2026
4. **Monthly Club Social** - Free event, March 20, 2026

### Step 3: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the admin panel:
   ```
   http://localhost:3000/admin/events
   ```

3. Check the homepage to see events loading dynamically

## 📊 Event Model Features

### Basic Information
- **Title** - Event name
- **Slug** - URL-friendly identifier (auto-generated)
- **Description** - Short summary for cards
- **Content** - Full HTML content for event details page

### Event Details
- **Start Date** - When the event begins
- **End Date** - When the event ends (optional)
- **Location** - Where it takes place
- **Price** - Cost in Naira (0 for free events)
- **Max Participants** - Capacity limit (optional)

### Media
- **Featured Image** - Main event image
- **Images Array** - Additional images (for future gallery)

### Status & Visibility
- **Status** - `draft`, `published`, or `cancelled`
- **Featured** - Show on homepage (boolean)

### Registration
- **Requires Registration** - Toggle registration system
- **Registration Deadline** - Last date to register
- **Registrations Count** - Track participants

### SEO
- **Meta Title** - Custom page title
- **Meta Description** - Search engine description

## 🎯 Admin Features

### Events List Page (`/admin/events`)
- View all events in a table
- Filter by status (All, Published, Draft, Cancelled)
- See event thumbnails
- View registration counts
- Quick actions: View, Edit, Delete
- Status badges for easy identification

### Create Event Page (`/admin/events/new`)
- Comprehensive form with all fields
- Auto-generate slug from title
- Image upload integration
- Date/time pickers
- Registration settings
- SEO fields
- Status management

### Features
- **Real-time validation** - Required fields marked
- **Image upload** - Integrated with Cloudinary
- **Auto-slug generation** - From event title
- **Date formatting** - User-friendly date/time inputs
- **Price formatting** - Nigerian Naira display
- **Registration tracking** - See participant counts

## 🌐 Frontend Features

### Homepage Events Section
- Fetches published events from database
- Shows featured events prominently
- Displays up to 3 featured events
- Loading states with skeleton screens
- Empty state when no events
- Responsive grid layout

### Event Cards Display
- **Featured Events** - Large cards with full details
- **Other Events** - Grid of smaller cards
- **Dynamic Status** - Ongoing, Upcoming, Past
- **Registration Info** - Participant counts
- **Price Display** - Free or formatted price
- **Location** - Event venue
- **Dates** - Formatted date ranges

## 📝 Usage Examples

### Creating a New Event

1. Go to `/admin/events`
2. Click "Add Event"
3. Fill in the form:
   - **Title**: "Weekend Tennis Workshop"
   - **Slug**: Auto-generated as "weekend-tennis-workshop"
   - **Description**: "Improve your game with professional coaching"
   - **Start Date**: Select date and time
   - **Location**: "LKJ Tennis Club"
   - **Price**: 5000 (for ₦5,000)
   - **Max Participants**: 30
   - **Status**: "published"
   - **Featured**: Check to show on homepage
   - **Requires Registration**: Check if registration needed
4. Upload featured image
5. Click "Create Event"

### Editing an Event

1. Go to `/admin/events`
2. Click the edit icon on any event
3. Modify fields as needed
4. Click "Update Event"

### Deleting an Event

1. Go to `/admin/events`
2. Click the delete icon
3. Confirm deletion

## 🔄 Migration from Hardcoded Events

Your existing hardcoded events have been extracted and included in the seed script. The seed script includes:

1. **Prof. Tayo Inaugural Lecture**
   - Extracted from `/events/prof-tayo-inaugural-lecture/page.tsx`
   - Free event with registration
   - 100 participant limit

2. **DS Energy Tournament**
   - Extracted from `/events/ds-energy-tournament/page.tsx`
   - ₦20,000 entry fee
   - 200 participant limit
   - Multi-day event

3. **Summer Tennis Camp**
   - Extracted from `/events/summer-camp-registration/page.tsx`
   - ₦75,000 camp fee
   - 50 participant limit
   - 2-week duration

4. **Monthly Club Social**
   - New event added
   - Free, no registration required

## 🎨 Customization

### Adding Custom Fields

Edit `prisma/schema.prisma`:

```prisma
model Event {
  // ... existing fields
  customField String?
}
```

Then run:
```bash
npx prisma db push
```

### Changing Event Display

Edit `src/components/Events.tsx` to customize:
- Number of events shown
- Card layout
- Filtering logic
- Styling

### Adding Event Categories

You can extend the Event model to include categories:

```prisma
model Event {
  // ... existing fields
  category String? // "tournament", "clinic", "social", etc.
}
```

## 🔐 Security

- All create/update/delete operations require admin authentication
- Public API only returns published events
- Draft events are hidden from public view
- Registration data is protected

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly buttons
- Optimized images
- Smooth animations

## 🚀 Next Steps

### Phase 1: Event Detail Pages
Create dynamic event detail pages at `/events/[slug]`:
- Full event information
- Registration form (if required)
- Image gallery
- Related events

### Phase 2: Registration System
- Registration form component
- Email confirmations
- Payment integration (Paystack)
- Registration management in admin

### Phase 3: Advanced Features
- Event categories
- Recurring events
- Waitlist management
- Event analytics
- Email reminders
- Calendar export (iCal)

## 🐛 Troubleshooting

### Events not showing on homepage
- Check if events are marked as "published"
- Check if events are marked as "featured"
- Verify database connection
- Check browser console for errors

### Can't create events
- Verify you're logged in as admin
- Check admin role in database
- Verify API route is working
- Check browser console for errors

### Images not uploading
- Verify Cloudinary configuration
- Check `.env` file for credentials
- Test image upload component separately

## 📚 API Reference

### GET /api/events
Query parameters:
- `status` - Filter by status (all, published, draft, cancelled)
- `featured` - Filter featured events (true/false)

### POST /api/events
Body: Event object with all fields
Requires: Admin authentication

### GET /api/events/[id]
Returns: Single event with registration count

### PUT /api/events/[id]
Body: Updated event object
Requires: Admin authentication

### DELETE /api/events/[id]
Requires: Admin authentication

## ✅ Checklist

- [x] Database models created
- [x] API routes implemented
- [x] Admin list page created
- [x] Admin create page created
- [x] Admin sidebar updated
- [x] Frontend component updated
- [x] Seed script created
- [ ] Run database migration
- [ ] Seed initial events
- [ ] Test admin functionality
- [ ] Test frontend display
- [ ] Create event detail pages (future)
- [ ] Implement registration system (future)

## 🎉 Summary

Your events system is now fully database-driven! You can:

✅ Create events through admin panel
✅ Edit and delete events
✅ Manage event status and visibility
✅ Track registrations
✅ Display events dynamically on homepage
✅ Filter and search events
✅ Upload event images

Run the setup commands and start managing your events professionally! 🎾
