const Router = require("koa-router");
const FFMM = require("./routes/FFMM.js");

const router = new Router();
router.use(FFMM.routes());

module.exports = router;