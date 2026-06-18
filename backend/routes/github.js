const router = require("express").Router();
const axios  = require("axios");
let cache = { data:null, ts:0 };
const TTL = 5 * 60 * 1000;

router.get("/", async (req, res) => {
  if (cache.data && Date.now() - cache.ts < TTL) return res.json(cache.data);
  try {
    const username = process.env.GITHUB_USERNAME || "anmolsingh45044-lab";
    const headers  = process.env.GITHUB_TOKEN ? { Authorization:`token ${process.env.GITHUB_TOKEN}` } : {};
    const [profile, repos] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`, { headers }),
      axios.get(`https://api.github.com/users/${username}/repos?sort=stars&per_page=8`, { headers }),
    ]);
    const payload = {
      profile: profile.data,
      repos: repos.data.map(r => ({
        id:r.id, name:r.name, description:r.description, html_url:r.html_url,
        homepage:r.homepage, language:r.language, stargazers_count:r.stargazers_count,
        forks_count:r.forks_count, topics:r.topics, updated_at:r.updated_at,
      })),
    };
    cache = { data:payload, ts:Date.now() };
    res.json(payload);
  } catch(e) { res.status(500).json({ error:e.message }); }
});

module.exports = router;
