# How to Edit Events

## Step-by-Step Guide

### 1. Access the Admin Panel
- Go to: `http://localhost:3000/admin` (or your domain + `/admin`)
- Sign in with your admin account

### 2. Navigate to Events
- In the left sidebar, click on **"Events"** (has a calendar icon)
- This takes you to: `/admin/events`

### 3. View All Events
You'll see a table with all your events showing:
- Event thumbnail image
- Title and description
- Date and location
- Price
- Registration count
- Status (Published/Draft/Cancelled)
- Action buttons

### 4. Edit an Event
- Find the event you want to edit in the table
- On the right side of the row, you'll see 3 icons:
  - 👁️ **Eye icon** - View the public event page
  - ✏️ **Pencil icon** - Edit the event (click this!)
  - 🗑️ **Trash icon** - Delete the event

- Click the **pencil icon** to edit
- This opens the edit form at `/admin/events/{event-id}/edit`

### 5. Edit Event Details
You can update:
- **Title** - Event name
- **Slug** - URL path (e.g., `summer-tournament`)
- **Description** - Short text for cards
- **Content** - Full event details
- **Start/End Date** - When it happens
- **Location** - Where it takes place
- **Featured Image** - Upload a new image or keep existing
- **Status** - Draft/Published/Cancelled
- **Featured** - Check to show on homepage (max 3)

### 6. Upload/Change Image
- Scroll to "Featured Image" section
- Click "Choose File" to upload a new image
- Wait for upload to complete
- Image URL will appear in the field

### 7. Save Changes
- Click the **"Save Changes"** button at the bottom
- You'll be redirected back to the events list

## Important Notes

### For Homepage Display:
1. **Status must be "Published"** - Draft events don't show
2. **Check "Featured"** - Only featured events show in large cards
3. **Upload an image** - Events without images show a calendar icon placeholder
4. **Max 3 featured events** - Only first 3 featured events show on homepage

### Event Sorting:
- Homepage shows events sorted by date (latest first)
- Featured events appear at top in large horizontal cards
- Other events appear below in 3-column grid

## Quick Access URLs

- Admin Events List: `/admin/events`
- Create New Event: `/admin/events/new`
- Edit Event: `/admin/events/{event-id}/edit`
- Public Events Page: `/events`

## Troubleshooting

**Can't see edit button?**
- Make sure you're at `/admin/events` (not `/events`)
- Check you're logged in as admin
- Look in the rightmost column of the table

**Event not showing on homepage?**
- Check Status is "Published"
- Check "Featured" checkbox is enabled
- Make sure you have uploaded a featured image
- Only first 3 featured events show

**Image not displaying?**
- Make sure image uploaded successfully
- Check the Featured Image URL field has a value
- Verify image is from Cloudinary or valid URL
