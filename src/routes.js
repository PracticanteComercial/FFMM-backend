import Router from "koa-router";
import FFMM from "./routes/FFMM.js";


const router = new Router();
router.use(FFMM.routes());

export default router;