# Event Hero Banner Feature

## Overview
Dynamic, animated event banner system that displays at the top of the homepage, supporting multiple events with automatic rotation.

## Features

### 1. Multiple Events Support
- Admins can mark multiple events to show in the hero banner
- Events automatically rotate every 5 seconds
- Smooth animations between event transitions

### 2. Animations
- **Image**: Scale animation (0.8 → 1.0) when changing events
- **Title**: Slide up/down animation with fade
- **Details**: Slide up/down animation with slight delay for stagger effect
- **CTA Button**: Scale animation
- All animations use Framer Motion for smooth transitions

### 3. Interactive Elements
- **Pagination Dots**: Click to jump to specific event (desktop only)
  - Active dot: Elongated pill shape (w-6 h-2)
  - Inactive dots: Small circles (w-2 h-2)
  - Hover effect on inactive dots
- **Close Button**: Users can dismiss the banner
- **View Event Button**: Links to event detail page

### 4. Auto-calculated Information
- **Date Range**: Automatically formats start/end dates
- **Status**: Shows "Upcoming", "Ongoing", or "Ended" based on current date
- **Duration**: Calculates and displays event duration (Days/Weeks)
- **Status Colors**:
  - Ongoing: Green
  - Upcoming: Blue
  - Ended: Gray

### 5. Responsive Design
- Mobile: Compact layout, simplified text
- Desktop: Full information with pagination dots
- Smooth transitions at all breakpoints

## Admin Controls

### Marking Events for Hero Banner
1. Go to Admin → Events
2. Find the event you want to feature
3. Click "Show in Hero Banner" button
4. Event will be added to the rotation
5. Can enable multiple events - they'll all rotate

### Visual Indicators
- Events in hero banner show a purple badge: "🔔 Hero Banner"
- Badge appears next to event title in admin list
- Easy to see which events are currently featured

## Technical Implementation

### Database
- Added `showInHeroBanner` boolean field to Event model
- Multiple events can have this set to `true`

### API Endpoints
- `GET /api/events?heroBanner=true` - Returns all events marked for hero banner
- `PATCH /api/events/[id]` - Toggle hero banner status for an event

### Components
- `UpcomingEventBanner.tsx` - Main banner component with rotation logic
- Uses Framer Motion for animations
- Auto-rotates every 5 seconds when multiple events exist

## Usage

### For Admins
1. Create events as normal
2. Mark events for hero banner using the toggle button
3. Events will automatically appear and rotate on homepage
4. Can have 1-10 events in rotation (API limit)

### For Users
- Banner appears at top of homepage (below navbar)
- Shows current event information
- Can click to view full event details
- Can dismiss banner with X button
- Can manually navigate between events using dots (desktop)

## Styling
- Brand colors: #911b1e (primary red)
- Background: White with subtle border
- Fixed position below navbar (top-20)
- Backdrop blur effect for modern look
- Shadow for depth

## Future Enhancements
1. Add priority/order field for custom rotation sequence
2. Add different animation styles (slide, fade, etc.)
3. Add pause on hover
4. Add swipe gestures for mobile
5. Add analytics tracking for banner clicks
6. Add A/B testing for different banner styles
