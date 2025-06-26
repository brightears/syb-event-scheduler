# SYB Event Scheduler - User Manual

## 📋 Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Settings Page](#settings-page)
4. [Creating Events](#creating-events)
5. [Managing Zones](#managing-zones)
6. [Monitoring with Logs](#monitoring-with-logs)
7. [Common Use Cases](#common-use-cases)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The SYB Event Scheduler automates music changes across your Soundtrack zones. Instead of manually changing music at different times of day, you can schedule playlists or music schedules to play automatically.

### Key Concepts
- **Event**: A scheduled action to change music at a specific time
- **Zone**: A physical location/speaker system (e.g., Lobby, Restaurant, Pool)
- **Music Library**: The account whose playlists/schedules you want to use
- **Playlist**: A single collection of songs
- **Schedule**: A time-based rotation of different playlists throughout the day

---

## Getting Started

### Step 1: Access the Application
Navigate to: https://syb-event-scheduler.onrender.com

### Step 2: Navigate the Interface
The app has three main sections:
- **Events**: Create and manage scheduled music changes
- **Settings**: Configure music sources and manage zones
- **Logs**: Monitor execution history and troubleshoot issues

---

## Settings Page

Before creating events, you must configure your music source.

### Select Music Library
1. Go to **Settings**
2. Click **"Select music library"**
3. Choose which account's music you want to use
4. This determines what playlists/schedules are available

### Zone Management
Due to the large number of zones, use these efficient methods:

#### Load Zones by Account
1. Enter an Account ID in the "Load Zones by Account ID" box
2. Click **"Load Account Zones"**
3. This loads only that account's zones (avoiding timeouts)

#### Finding Account IDs
Account IDs can be found:
- In the music library dropdown list
- From your CSV file of accounts and zones
- Example: `QWNjb3VudCwsMWNqMTM3Ymp3MXMv`

### Cache Management
- **Refresh accounts**: Update the list of available accounts
- **Refresh zones**: Update the list of available zones
- **Clear cache**: Start fresh if data seems outdated

---

## Creating Events

### Step 1: Create New Event
1. Go to **Events** → **"New Event"**
2. Fill in the event details:

#### Event Details
- **Name**: Descriptive name (e.g., "Happy Hour Music", "Christmas Lobby")
- **Description**: Optional notes about the event
- **Assign**: Select the music to play
  - Click the dropdown to see available playlists
  - Schedules appear in a separate section (if available)
- **When**: Set the date and time for the music change
- **Repeat**: Choose repetition pattern
  - Never (one-time event)
  - Daily
  - Weekly
  - Monthly

3. Click **"Create Event"**

### Step 2: You're Redirected to Event Details
After creating an event, you'll see the event details page where you add zones.

---

## Managing Zones

On the event details page, you'll see two sections:

### Adding Zones

#### Method 1: Add Zone by ID (Recommended)
1. Use the **"Add Zone by ID"** box at the top
2. Enter a specific zone ID from your CSV
3. Click **"Add Zone"**
4. The zone appears in the "Active zones" table

#### Method 2: Select from Available Zones
1. If zones are loaded, they appear in "Available zones" table
2. Check the boxes next to zones you want
3. Click **"Add"** button
4. Selected zones move to "Active zones"

### Active Zones
- Shows all zones that will receive the music change
- You can remove zones by clicking the remove button
- Multiple zones can receive the same music assignment

### Important Notes
- You can mix zones from different accounts/hotels
- The music source (from Settings) can play in any zone you have access to
- Example: Use Hilton Pattaya's Christmas playlist in Desert Rock Resort zones

---

## Monitoring with Logs

The Logs page shows execution history and helps troubleshoot issues.

### What Logs Show
- **Timestamp**: When the scheduler ran
- **Events Triggered**: Which events were executed
- **Zone Updates**: Success/failure for each zone
- **Error Messages**: Details if something went wrong

### When to Check Logs
1. **After creating new events**: Verify they executed correctly
2. **Daily monitoring**: Morning check for overnight events
3. **Troubleshooting**: When music doesn't seem to be playing correctly
4. **Reporting**: Track music changes for management

### Reading Log Entries
```
✅ Successful execution shows all zones updated
⚠️ Partial success shows some zones failed
❌ Failed execution shows error details
```

---

## Common Use Cases

### 1. Daily Music Rotation
**Goal**: Different music throughout the day in the restaurant
```
Morning Energy - 6:00 AM - Upbeat Breakfast playlist
Lunch Vibes - 12:00 PM - Casual Dining playlist  
Dinner Ambiance - 6:00 PM - Fine Dining playlist
All set to repeat daily
```

### 2. Seasonal Campaigns
**Goal**: Christmas music in all public areas
```
Event: "Christmas Season"
Music: Christmas Chill playlist
Zones: Lobby, Restaurant, Bar, Pool
When: December 1st, 8:00 AM
Repeat: Daily until manually disabled
```

### 3. Special Events
**Goal**: Special music for Happy Hour
```
Event: "Happy Hour"
Music: Upbeat Cocktail Hour playlist
Zones: Bar, Lounge
When: Every Friday, 5:00 PM
Repeat: Weekly
```

### 4. Using Schedules
**Goal**: Automated all-day music rotation
```
Event: "Lobby Daily Schedule"
Music: Select a Schedule (not playlist)
Zones: Lobby
When: Every day at midnight
Repeat: Daily
The schedule handles all time-based changes automatically
```

---

## Troubleshooting

### Music Not Playing
1. Check Logs for error messages
2. Verify the zone is online in Soundtrack
3. Ensure the playlist/schedule still exists
4. Check that the event time has passed

### Can't See Playlists
1. Verify you've selected a music library in Settings
2. Try refreshing the library cache
3. Check if the account has any playlists

### Zones Not Loading
1. Use "Load Zones by Account ID" instead of loading all
2. Clear cache and try again
3. Verify your API token has access to those zones

### Events Not Triggering
1. Check that the scheduled time has passed
2. Verify the event isn't disabled
3. Look for error messages in Logs
4. Ensure the worker is running (60-second intervals)

---

## Best Practices

1. **Name Events Clearly**: Use descriptive names that indicate purpose and location
2. **Test First**: Create a test event for a few minutes in the future to verify setup
3. **Monitor Logs**: Check logs regularly, especially after creating new events
4. **Document Zone IDs**: Keep a reference of commonly used zone IDs
5. **Use Schedules**: For all-day rotations, use schedules instead of multiple events
6. **Plan Ahead**: Set up seasonal events in advance (holidays, special promotions)

---

## Quick Reference

### Workflow Summary
1. **Settings** → Select music library (account)
2. **Events** → Create new event with music and timing
3. **Event Details** → Add zones using IDs
4. **Logs** → Monitor execution

### Key Features
- Schedule music changes for any future date/time
- Repeat patterns: Daily, Weekly, Monthly
- Multiple zones per event
- Mix music sources and zone destinations
- Manual zone addition by ID (avoids timeouts)
- Execution history in logs

---

## Support

For issues or questions:
- Check the Logs page for error details
- Verify your API token permissions
- Ensure zones are online in Soundtrack
- Contact your system administrator for access issues