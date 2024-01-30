const Router = require("koa-router");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");


dotenv.config();
const router = new Router();

const userEmail = process.env.EMAIL_USER;
const userPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Cambia esto por la dirección de tu servidor SMTP
    port: 587, // Puerto del servidor SMTP
    secure: false, // true para SSL, false para otros
    auth: {
        user: userEmail,
        pass: userPassword,
    },
});

router.post("/sendInvertFundEmailToExecutive", async (ctx) => {
    try {
        const { clientName, clientNumber, investmentAmount, fundName, fundRUN } = ctx.request.body;

        const mailOptions = {
            from: 'practicantecomercial@vectorcapital.cl',
            to: 'practicantecomercial@vectorcapital.cl', // Cambia esto por el correo electronico del ejecutivo
            subject: '[FFMM] Nuevo monto de inversión de cliente',
            text: `Estimado/a, \n\n Junto con saludar, se ha recibido una solicitud de inversión de <strong style="font-size: 18px;">${investmentAmount} CLP</strong> por parte de cliente. \n\n Saludos cordiales, \n Vector Capital `,
            html: `Estimado/a, <br/><br/> Junto con saludar, se ha recibido una solicitud de inversión:<br/>
             Cliente: <strong style="font-size: 18px;">${clientName}</strong>, <br/>
             Número de cliente:  <strong style="font-size: 18px; color: red;">${clientNumber}, </strong> <br/>
             Nombre del fondo a invertir:   <strong style="font-size: 18px;"> ${fundName}</strong>, <br/>
             RUN del fondo:     <strong style="font-size: 18px;"> ${fundRUN}</strong>, <br/>
             Monto total:  <strong style="font-size: 18px;"> ${investmentAmount} CLP </strong> <br/>
             
             <br/> Saludos cordiales,<br/> Vector Capital`,
        };

        // Envía el correo electrónico
        const info = await transporter.sendMail(mailOptions);

        ctx.status = 200;
        ctx.body = { message: 'Correo enviado a ejecutivo con éxito!', info };
    } catch (error) {
        ctx.throw(500, error);
    }
});

router.post("/sendRescueFundEmailToExecutive", async (ctx) => {
    try {
        const { idInstrumento,
            dscInstrumento,
            nemotecnico,
            cantidad,
            tasaPrecio,
            porcentajeDeCantidadCuota,
            cuenta,
            identificador,
            nombreCliente, } = ctx.request.body;

        const mailOptions = {
            from: 'practicantecomercial@vectorcapital.cl',
            to: 'practicantecomercial@vectorcapital.cl', // Cambia esto por el correo electronico del ejecutivo
            subject: '[FFMM] Rescate de fondo de cliente',
            html: `Estimado/a, <br/><br/> Junto con saludar, se ha recibido una solicitud de rescate:<br/>
             Cliente: <strong style="font-size: 18px;">${nombreCliente}</strong> , <br/>
             Número de cliente:  <strong style="font-size: 18px;">${identificador}, </strong> <br/>
             Cuenta de cliente:  <strong style="font-size: 18px;  color: red;">${cuenta}, </strong> <br/>
             Nombre del fondo a rescatar:   <strong style="font-size: 18px;"> ${dscInstrumento}</strong>, <br/>
             Nemotécnico del fondo:     <strong style="font-size: 18px;"> ${nemotecnico}</strong>, <br/>
             Cantidad de cuota del cliente (Comprobar en el momento): <strong style="font-size: 18px;"> ${cantidad} </strong>, <br/>
             Porcentaje a rescatar:  <strong style="font-size: 18px;  color: red;"> ${porcentajeDeCantidadCuota}% </strong> <br/>

             <br/> Saludos cordiales,<br/> Vector Capital`,
        };
        const info = await transporter.sendMail(mailOptions);
        ctx.status = 200;
        ctx.body = { message: 'Correo enviado a ejecutivo con éxito!', info };
    } catch (error) {
        ctx.throw(500, error);
    }
});

module.exports = router;
