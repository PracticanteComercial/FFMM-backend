const Router = require("koa-router");
const FFMM = require("./routes/FFMM.js");
const SendEmail = require("./routes/SendEmail.js");
const ClientInfo = require("./routes/ClientInfo.js");

const router = new Router();
router.use(FFMM.routes());
router.use(SendEmail.routes());
router.use(ClientInfo.routes());

module.exports = router;