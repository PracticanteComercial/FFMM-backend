const Router = require("koa-router");
const FFMM = require("./routes/FFMM.js");
const SendInvertEmail = require("./routes/SendInvertEmail.js");

const router = new Router();
router.use(FFMM.routes());
router.use(SendInvertEmail.routes());

module.exports = router;