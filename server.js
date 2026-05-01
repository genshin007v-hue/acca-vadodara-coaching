const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Upload failed" });
        }

        return res.json({
          url: result.secure_url
        });
      }
    );

    const stream = result;
    stream.end(file.buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});
