const Router = require("koa-router");
const FFMM = require("./routes/FFMM.js");
const SendInvertEmail = require("./routes/SendInvertEmail.js");
const AvailableBalance = require("./routes/AvailableBalance.js");

const router = new Router();
router.use(FFMM.routes());
router.use(SendInvertEmail.routes());
router.use(AvailableBalance.routes());

module.exports = router;