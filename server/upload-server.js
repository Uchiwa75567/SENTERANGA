require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(bodyParser.json({ limit: '25mb', timeout: 30000 }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error('Cloudinary credentials not set. Please provide CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in environment.');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});
https://www.instagram.com/
// POST /upload-images
// Body: { images: ["data:image/...base64,...", ...] }
app.post('/upload-images', async (req, res) => {
  try {
    const images = req.body.images || [];
    if (!Array.isArray(images) || images.length === 0) return res.status(400).json({ error: 'No images provided' });

    const results = [];
    for (const img of images) {
      // img can be a data URL or a remote URL
      const uploadRes = await cloudinary.uploader.upload(img, { folder: 'senteranga_products' });
      results.push({ url: uploadRes.secure_url, public_id: uploadRes.public_id });
    }

    res.json({ uploaded: results });
  } catch (err) {
    console.error('Upload error', err);
    res.status(500).json({ error: 'Upload failed', details: err.message || err });
  }
});

const port = process.env.PORT || 4201;
app.listen(port, () => console.log(`Cloudinary upload server running on http://localhost:${port}`));
