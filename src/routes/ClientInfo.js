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
        const saldoCLP = encontrarSaldoCLP(responseData);
        const montoCLP = saldoCLP ? saldoCLP.monto : null;
        ctx.body = { montoCLP };
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Error al obtener la información' };
    }
});

const encontrarSaldoCLP = (datos) => {
    return datos.find(objeto => objeto.codMoneda === "CLP");
};

router.get('/getClientName/:numeroCuenta/:clienteTipo', async (ctx) => {
    const fecha = new Date().toISOString();
    console.log(fecha);
    const getInfoUrl = `${VOULTECH_URL}/api/publicapi/creasys/Cajas/ConSaldo?NumCuenta=${ctx.params.numeroCuenta}/${ctx.params.clienteTipo}&Fecha=${fecha}`;
    try {
        const token = ctx.state.token || (await axios.post(`${ctx.origin}/getToken`)).data.token;
        const response = await axios.get(getInfoUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const responseData = response.data;
        ctx.body = responseData[0].idCuentaNavigation.idClienteNavigation.nombre;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Error al obtener la información' };
    }
});


router.get('/getClientFunds/:numeroCuenta/:clienteTipo', async (ctx) => {
    const fecha = new Date().toISOString();
    console.log(fecha);
    const getInfoUrl = `${VOULTECH_URL}/api/publicapi/creasys/Cartera?Fecha=${fecha}&NumCuenta=${ctx.params.numeroCuenta}/${ctx.params.clienteTipo}`;
    try {
        const token = ctx.state.token || (await axios.post(`${ctx.origin}/getToken`)).data.token;
        const response = await axios.get(getInfoUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const responseData = response.data;
        const filteredData = responseData.filter(item => item.codSubClaseInstrumento === "FMV" || item.codSubClaseInstrumento === "FMF");
        ctx.body = filteredData;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Error al obtener la información' };
    }
});


module.exports = router;
