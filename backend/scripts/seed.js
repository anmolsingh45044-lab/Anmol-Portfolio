/**
 * One-time content seeder — populates Skills, Timeline and Certs from Anmol's resume.
 * Safe to re-run: it wipes and re-inserts these three collections only (never touches
 * Admin, Contact, Project or Stats data).
 *
 * Usage:  npm run seed   (after MONGODB_URI is set in .env)
 */
require("dotenv").config();
const mongoose = require("mongoose");
const { Skill, Timeline, Cert } = require("../models");

const skills = [
  { cat:"Frontend",             color:"#38bdf8", order:1, items:[
    { name:"HTML",        level:85 },
    { name:"CSS",         level:80 },
    { name:"JavaScript",  level:75 },
    { name:"React",       level:70 },
  ]},
  { cat:"Backend & Data",       color:"#00e5a0", order:2, items:[
    { name:"Node.js",     level:65 },
    { name:"Express",     level:65 },
    { name:"MongoDB",     level:65 },
    { name:"REST APIs",   level:70 },
  ]},
  { cat:"Core Languages",       color:"#a78bfa", order:3, items:[
    { name:"Java (OOP)",  level:75 },
    { name:"Python",      level:70 },
    { name:"C",           level:60 },
  ]},
  { cat:"AI & Machine Learning", color:"#a78bfa", order:4, items:[
    { name:"Pandas",            level:60 },
    { name:"NumPy",             level:60 },
    { name:"Machine Learning",  level:55 },
    { name:"Generative AI",     level:40 },
  ]},
];

const timeline = [
  { year:"2025", label:"Full Stack Developer Intern", sub:"Early-stage Start-up · Ghaziabad (Nov – Dec 2025)", type:"work", order:1 },
  { year:"2026", label:"BCA in Artificial Intelligence", sub:"IMS Ghaziabad, Uttar Pradesh · Expected Jun 2026", type:"edu",  order:2 },
];

const certs = [
  { title:"Data Analytics Workshop",            date:"Apr 2026",          color:"#38bdf8" },
  { title:"Internet of Things — IIT Kanpur",     date:"Oct 2026 (expected)", color:"#a78bfa" },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Promise.all([Skill.deleteMany({}), Timeline.deleteMany({}), Cert.deleteMany({})]);
    await Skill.insertMany(skills);
    await Timeline.insertMany(timeline);
    await Cert.insertMany(certs);
    console.log("✅ Seeded skills, timeline and certifications from resume data.");
  } catch (e) {
    console.error("❌ Seed failed:", e.message);
  } finally {
    process.exit(0);
  }
})();
