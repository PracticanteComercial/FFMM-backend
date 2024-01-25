const Router = require("koa-router");
const axios = require("axios");
const router = new Router();
const dotenv = require("dotenv");
dotenv.config();

const VOULTECH_USER = process.env.VOULTECH_USER;
const VOULTECH_PASSWORD = process.env.VOULTECH_PASSWORD;
const VOULTECH_URL = process.env.VOULTECH_URL;

router.post('/getToken', async (ctx) => {
    const signInUrl = `${VOULTECH_URL}/api/publicapi/shared/auth/signin`;
    try {
        const response = await axios.post(signInUrl, {
            UserName: VOULTECH_USER,
            Password: VOULTECH_PASSWORD
        });
        const token = response.data.token;
        ctx.body = { token };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Error al obtener el token' };
    }
});

router.get('/getBalance/:numeroCuenta/:clienteTipo', async (ctx) => {
    const fecha = new Date().toISOString();
    const getInfoUrl = `${VOULTECH_URL}/api/publicapi/creasys/Cajas/ConSaldoOnline?NumCuenta=${ctx.params.numeroCuenta}/${ctx.params.clienteTipo}&Fecha=${fecha}`;
    try {
        const token = ctx.state.token || (await axios.post(`${ctx.origin}/getToken`)).data.token;
        const response = await axios.get(getInfoUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const responseData = response.data;
        ctx.body = responseData;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Error al obtener la información' };
    }
});

module.exports = router;
