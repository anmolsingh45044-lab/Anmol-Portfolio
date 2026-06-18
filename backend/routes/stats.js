const router = require("express").Router();
const { Stats } = require("../models");
const authMW    = require("../middleware/auth");

router.post("/visit", async (req, res) => {
  const today = new Date().toISOString().slice(0,10);
  const doc = await Stats.findOneAndUpdate({date:today},{$inc:{visits:1}},{upsert:true,new:true});
  res.json({ visits:doc.visits });
});

router.get("/", authMW, async (req, res) => {
  res.json(await Stats.find().sort({date:-1}).limit(30));
});

module.exports = router;
