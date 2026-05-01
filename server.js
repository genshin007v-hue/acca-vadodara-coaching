const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

// ✅ FIX CORS
app.use(cors({
  origin: "*", // allow all (for now)
}));

// storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ ROUTE MUST EXIST
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file.originalname);

    res.json({
      url: "https://dummy-link.com/" + req.file.originalname
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
