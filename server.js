const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// Multer config
const upload = multer({ dest: "uploads/" });

// Cloudinary config (from Render ENV)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Upload Route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

 const result = await cloudinary.uploader.upload(req.file.path, {
  resource_type: "auto",
  type: "upload",        // 👈 VERY IMPORTANT
  access_mode: "public", // 👈 VERY IMPORTANT
});
  
    // delete temp file
    fs.unlinkSync(req.file.path);

    return res.json({
      url: result.secure_url,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
