const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: 'ddyyxqugs',
  api_key: '215689441362215',
  api_secret: '_TE-ovCbLeGWSKDN48y-XDpZYNM'
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw'
    });

    fs.unlinkSync(req.file.path); // delete temp file

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
