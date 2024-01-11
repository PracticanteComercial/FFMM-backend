
import koa from "koa";
import KoaLogger from "koa-logger";
import koaBody from "koa-body";


const app = new koa();

app.use(KoaLogger());
app.use(koaBody());

app.use((ctx, next) => {
    ctx.body = "Backend of FFMM";
})

app.listen(3000, () => {
    console.log("Running. Listening at port 3000.");
})