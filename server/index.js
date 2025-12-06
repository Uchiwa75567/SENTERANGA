const jsonServer = require('json-server');
const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '25mb' }));

// Cloudinary configuration
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (CLOUD_NAME && API_KEY && API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
  });
}

// Custom upload endpoint
app.post('/upload-images', async (req, res) => {
  try {
    const images = req.body.images || [];
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

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

// JSON Server setup
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use JSON Server middlewares
app.use(middlewares);

// Mount JSON Server on /api route
app.use('/api', router);

// Start server
app.listen(port, () => {
  console.log(`SENTERANGA Backend running on port ${port}`);
  console.log(`JSON Server available at http://localhost:${port}/api`);
  console.log(`Upload endpoint available at http://localhost:${port}/upload-images`);
});