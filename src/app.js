const koa = require("koa");
const KoaLogger = require("koa-logger");
const { koaBody } = require("koa-body");
const router = require("./routes.js");
const orm = require("./models");   

const app = new koa();

app.context.orm = orm;

app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());

app.use((ctx, next) => {
    ctx.body = "Backend of FFMM";
})

module.exports = app;
