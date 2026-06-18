const router    = require("express").Router();
const nodemailer = require("nodemailer");
const { Contact, Stats } = require("../models");
const authMW = require("../middleware/auth");

const validate = (b) => {
  const e = [];
  if (!b.name?.trim()) e.push("Name is required");
  if (!b.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) e.push("Valid email required");
  if (!b.message?.trim() || b.message.length < 10) e.push("Message must be at least 10 characters");
  return e;
};

const mailer = nodemailer.createTransport({
  service:"gmail",
  auth:{ user:process.env.SMTP_USER, pass:process.env.SMTP_PASS },
});

router.post("/", async (req, res) => {
  try {
    const errors = validate(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const { name, email, message } = req.body;
    const doc = await Contact.create({ name, email, message, ip:req.ip });
    const today = new Date().toISOString().slice(0,10);
    await Stats.findOneAndUpdate({ date:today }, { $inc:{ messages:1 } }, { upsert:true });
    if (process.env.SMTP_USER) {
      mailer.sendMail({
        from:`"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to:process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
        subject:`New message from ${name}`,
        html:`<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g,"<br>")}</p>`,
      }).catch(console.error);
    }
    res.status(201).json({ ok:true, id:doc._id });
  } catch(e) { res.status(500).json({ error:e.message }); }
});

router.get("/",            authMW, async (req, res) => res.json(await Contact.find().sort({ createdAt:-1 }).lean()));
router.patch("/:id/read",  authMW, async (req, res) => res.json(await Contact.findByIdAndUpdate(req.params.id,{read:true},{new:true})));
router.delete("/:id",      authMW, async (req, res) => { await Contact.findByIdAndDelete(req.params.id); res.json({ok:true}); });

module.exports = router;
