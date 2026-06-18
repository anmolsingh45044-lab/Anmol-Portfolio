const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");
const { Admin } = require("../models");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error:"Username and password required" });
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error:"Invalid credentials" });
    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ error:"Invalid credentials" });
    admin.lastLogin = new Date();
    await admin.save();
    const token = jwt.sign({ id:admin._id, username }, process.env.JWT_SECRET, { expiresIn:"24h" });
    res.json({ token, username });
  } catch(e) { res.status(500).json({ error:e.message }); }
});

router.post("/setup", async (req, res) => {
  if (process.env.ALLOW_SETUP !== "true") return res.status(403).json({ error:"Setup disabled" });
  try {
    const { username, password } = req.body;
    if (await Admin.findOne({ username })) return res.status(400).json({ error:"Admin already exists" });
    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await Admin.create({ username, passwordHash });
    res.json({ ok:true, id:admin._id });
  } catch(e) { res.status(500).json({ error:e.message }); }
});

module.exports = router;
