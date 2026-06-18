const router     = require("express").Router();
const multer     = require("multer");
const cloudinary = require("cloudinary").v2;
const authMW     = require("../middleware/auth");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key:    process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const upload = multer({ storage:multer.memoryStorage(), limits:{ fileSize:5*1024*1024 } });

router.post("/", authMW, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error:"No file uploaded" });
  try {
    const b64     = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const result  = await cloudinary.uploader.upload(dataURI, { folder:"portfolio" });
    res.json({ url:result.secure_url, public_id:result.public_id });
  } catch(e) { res.status(500).json({ error:e.message }); }
});

module.exports = router;
