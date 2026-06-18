require("dotenv").config({ path:"../.env" });
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const { Admin } = require("../models");

const USERNAME = process.env.ADMIN_USERNAME || "anmol";
const PASSWORD = process.env.ADMIN_PASSWORD || "anmol2026";

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  console.warn("⚠️  Using default admin credentials. Set ADMIN_USERNAME / ADMIN_PASSWORD in .env before deploying.");
}

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  if (await Admin.findOne({ username:USERNAME })) {
    console.log("Admin already exists."); process.exit(0);
  }
  await Admin.create({ username:USERNAME, passwordHash:await bcrypt.hash(PASSWORD, 12) });
  console.log(`✅ Admin '${USERNAME}' created.`);
  process.exit(0);
})();
