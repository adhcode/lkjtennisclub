# Test Admin Events Page

## Quick Test Steps

1. **Make sure your dev server is running:**
   ```bash
   npm run dev
   ```

2. **Open your browser and go to:**
   ```
   http://localhost:3000/admin/events
   ```

3. **What you should see:**
   - A page with title "Events"
   - Filter buttons: All Events, Published, Draft, Cancelled
   - A table with columns: Event, Date & Location, Price, Registrations, Status, Actions
   - 8 rows of events
   - Each row should have 3 icons on the right: Eye, Pencil, Trash

4. **If you DON'T see the table:**
   - Open browser console (F12 or Cmd+Option+I)
   - Look for any red errors
   - Check the Network tab - is `/api/events?status=all` returning data?

5. **Test the API directly:**
   Open this URL in your browser:
   ```
   http://localhost:3000/api/events?status=all
   ```
   
   You should see JSON with 8 events.

6. **If API works but page doesn't show:**
   - Check browser console for JavaScript errors
   - The page might be stuck in loading state
   - Try clicking the filter buttons (Published, Draft, etc.)

## Direct Edit URL

If the buttons don't show, you can edit events directly by URL.

Get an event ID by running:
```bash
npx tsx scripts/check-events.ts
```

Then go to:
```
http://localhost:3000/admin/events/[EVENT-ID]/edit
```

Replace `[EVENT-ID]` with the actual ID from the script output.

## Common Issues

**Issue: Page shows "No events found"**
- The API might be returning empty
- Check filter - try clicking "Published" button
- Run: `npx tsx scripts/check-events.ts` to verify events exist

**Issue: Page is stuck loading (spinning wheel)**
- API might be failing
- Check browser console for errors
- Check terminal for server errors

**Issue: Table shows but no action buttons**
- This shouldn't happen - the buttons are in the code
- Check if icons are just not visible (try hovering where they should be)
- Check browser console for errors

**Issue: Clicking edit button does nothing**
- Check browser console for errors
- Try the direct URL method above
