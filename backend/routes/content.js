const router = require("express").Router();
const authMW = require("../middleware/auth");
const { Project, Skill, Timeline, Cert, SiteSetting, Blog } = require("../models");

const MODELS = { projects:Project, skills:Skill, timeline:Timeline, certs:Cert, blog:Blog };

router.get("/projects", async (req, res) => res.json(await Project.find({visible:true}).sort({order:1})));
router.get("/skills",   async (req, res) => res.json(await Skill.find().sort({order:1})));
router.get("/timeline", async (req, res) => res.json(await Timeline.find().sort({order:1})));
router.get("/certs",    async (req, res) => res.json(await Cert.find()));
router.get("/settings", async (req, res) => {
  const settings = await SiteSetting.find();
  res.json(Object.fromEntries(settings.map(s => [s.key, s.value])));
});
router.get("/blog",         async (req, res) => res.json(await Blog.find({published:true}).sort({createdAt:-1})));
router.get("/blog/:slug",   async (req, res) => {
  const post = await Blog.findOne({slug:req.params.slug,published:true});
  if (!post) return res.status(404).json({error:"Post not found"});
  res.json(post);
});

const crud = (Model) => ({
  create: async (req,res) => { try { res.status(201).json(await Model.create(req.body)); } catch(e) { res.status(400).json({error:e.message}); }},
  update: async (req,res) => { try { res.json(await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})); } catch(e) { res.status(400).json({error:e.message}); }},
  delete: async (req,res) => { try { await Model.findByIdAndDelete(req.params.id); res.json({ok:true}); } catch(e) { res.status(400).json({error:e.message}); }},
});

Object.entries(MODELS).forEach(([key, Model]) => {
  const c = crud(Model);
  router.post  (`/${key}`,     authMW, c.create);
  router.put   (`/${key}/:id`, authMW, c.update);
  router.delete(`/${key}/:id`, authMW, c.delete);
});

router.put("/settings/:key", authMW, async (req, res) => {
  try {
    const doc = await SiteSetting.findOneAndUpdate({key:req.params.key},{value:req.body.value},{upsert:true,new:true});
    res.json(doc);
  } catch(e) { res.status(400).json({error:e.message}); }
});

module.exports = router;
