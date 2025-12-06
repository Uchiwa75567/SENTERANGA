# Cloudinary Image Upload Setup

## Quick Start

### 1. Upload Server (runs on port 4201)

In a **separate terminal**, start the upload server:

```bash
npm run start:upload-server
```

You should see:
```
Cloudinary upload server running on http://localhost:4201
```

### 2. Start Angular dev server & JSON Server

In another terminal, run:

```bash
npm run dev
```

Or separately:
- **Terminal 1**: `npm run json-server` (port 3004)
- **Terminal 2**: `npm start` (port 4200)

### 3. Publish a Product with Images

1. Go to http://localhost:4200/dashboard-agriculteur
2. Fill the product form and select images
3. Click "Publier"
4. Images are uploaded to Cloudinary and stored as URLs in db.json

---

## How It Works

1. **Frontend** (`dashboard-agriculteur.component.ts`):
   - User selects files → converts to base64 via `FileReader`
   - Sends base64 images to `http://localhost:4201/upload-images` (POST)

2. **Upload Server** (`server/upload-server.js`):
   - Receives base64 images
   - Uploads each to Cloudinary via `cloudinary.uploader.upload()`
   - Returns Cloudinary URLs to frontend
   - Frontend stores those URLs in the product (not base64)

3. **Database** (`db.json`):
   - Product stores Cloudinary image URLs (not base64)
   - Much smaller database, faster loads

4. **Marketplace** (`product-card`):
   - Displays images from Cloudinary URLs directly

---

## Environment Variables

File: `.env` (created with your credentials)

```
CLOUDINARY_CLOUD_NAME=djha1kqvu
CLOUDINARY_API_KEY=494636796648231
CLOUDINARY_API_SECRET=dtM1F7ZUO87rKNiDTNNYZ4hnPeA
PORT=4201
```

---

## Troubleshooting

**Images not uploading?**
- Check if upload server is running: `npm run start:upload-server`
- Check server console for errors
- Verify `.env` has correct Cloudinary credentials

**Browser error: "Failed to fetch"?**
- Make sure upload server is on port 4201
- Check CORS issues (server allows all requests)

**Upload server not starting?**
- Confirm `server/upload-server.js` exists
- Run: `node server/upload-server.js` directly for detailed errors

---

## Files Modified

- `server/upload-server.js` — Node/Express upload endpoint
- `package.json` — Added npm script `start:upload-server`
- `.env` — Cloudinary credentials
- `src/app/pages/dashboard-agriculteur/dashboard-agriculteur.component.ts` — Calls upload server before saving product
