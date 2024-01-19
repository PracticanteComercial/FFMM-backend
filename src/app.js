const Koa = require("koa");
const KoaLogger = require("koa-logger");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const router = require("./routes.js");
const orm = require("./models");

const app = new Koa();

app.context.orm = orm;

// Middleware CORS
app.use(cors());

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser());

// Middleware de registro
app.use(KoaLogger());

// Rutas
app.use(router.routes());

// Ruta de respuesta predeterminada
app.use((ctx, next) => {
    ctx.body = "Backend of FFMM";
});

module.exports = app;
