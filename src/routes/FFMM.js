import Router from "koa-router";

const router = new Router();

const FFMM = [{
    "hola,": "Dudu"
}]


router.get("FFMM.show","/FFMM", async (ctx) => {
    ctx.body = FFMM;
} );


export default router;