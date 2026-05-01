const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ STEP 3 — ADD CORS HERE
app.use(cors());

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
