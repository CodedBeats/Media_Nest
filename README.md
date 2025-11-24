# Media Nest

A lightweight personal web app for tracking the (admittedly excessive) amount of media I consume.  
The app is designed primarily for personal use, but anyone is welcome to clone the project and run their own version.

**Live Site:** https://my-media-nest.vercel.app/

---

## Overview

Media Nest gives an at-a-glance view of everything I'm currently watching, reading, or planning to check out.  
While the public experience is read-only, the app includes an admin system that lets me add and update entries using various external APIs.

Effective caching reduces redundant API requests by preventing re-queries unless data updates are required.

To run your own instance, you’ll need:
- A Firebase project (with config values)
- A free OMDB API key

---

## Features

### Tracking
Supports tailored tracking for each media type:

- **Manga** - progress by chapters  
- **Movies** - tracked by status  
- **Series** - progress by seasons and episodes  

### Filtering & Search
- Filter by **status**:  
  _Plan to Watch/Read, Watching/Reading, Completed, On Hold, Dropped_
- Filter by **rating**
- Search by name

### Admin Tools
(Personal use)
- Add new media via external APIs  
- Update progress, rating, and metadata  
- Automatic media info retrieval from MangaDex, OMDB, and TVMaze

---

## Tech Stack

### Frontend
- Vite  
- React  
- TypeScript  
- Tailwind CSS  

### Backend & Services
- Firebase (Firestore + Authentication)  
- Vercel Serverless Functions  

### External APIs
- MangaDex API (Manga)  
- OMDB API (Movies)  
- TVMaze API (Series)  

### Hosting
- Vercel  

---

## Setup

1. Clone the repository  
2. Create a Firebase project and copy your config  
3. Request a free OMDB API key  
4. Add environment variables for:
   - Firebase config  
   - OMDB API key  
5. Install dependencies:
   ```bash
   npm install
6. Run local web app:
   ```bash
   npm run dev
