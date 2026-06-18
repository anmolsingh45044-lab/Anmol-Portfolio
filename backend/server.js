require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const helmet   = require("helmet");
const morgan   = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Render/other PaaS sit behind a reverse proxy — needed for correct req.ip in contact.js
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials:true }));
app.use(express.json({ limit:"10mb" }));
app.use(morgan("combined"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(e  => { console.error("❌ DB error:", e.message); process.exit(1); });

app.use("/api/auth",    require("./routes/auth"));
app.use("/api/content", require("./routes/content"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/github",  require("./routes/github"));
app.use("/api/stats",   require("./routes/stats"));
app.use("/api/upload",  require("./routes/upload"));

app.get("/api/health", (req, res) => res.json({ status:"ok", ts:new Date().toISOString() }));
app.get("/", (req, res) => res.send("Anmol Singh — Portfolio API. See /api/health"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
