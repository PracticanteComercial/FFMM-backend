// const Router = require("koa-router");
// const nodemailer = require("nodemailer");

// const router = new Router();

// router.post("/sendEmailToExecutive", async (ctx) => {
//     try {
//         const { investmentAmount } = ctx.request.body;

//         ctx.status = 200;
//         ctx.body = { message: 'Correo enviado a ejecutivo con éxito!' };
//     } catch (error) {
//         ctx.throw(500, error);
//     }
// } );


// module.exports = router;


const Router = require("koa-router");
const nodemailer = require("nodemailer");

const router = new Router();

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Cambia esto por la dirección de tu servidor SMTP
    port: 587, // Puerto del servidor SMTP
    secure: false, // true para SSL, false para otros
    auth: {
        user: 'practicantecomercial@vectorcapital.cl', // Tu dirección de correo electrónico
        pass: 'Vector.2023', // Tu contraseña de correo electrónico
    },
});

router.post("/sendEmailToExecutive", async (ctx) => {
    try {
        const { investmentAmount } = ctx.request.body;

        // Configura el contenido del correo electrónico
        const mailOptions = {
            from: 'practicantecomercial@vectorcapital.cl',
            to: 'practicantecomercial@vectorcapital.cl', // Cambia esto por la dirección del ejecutivo
            subject: '[FFMM] Nuevo monto de inversión de cliente',
            text: `Estimado/a, \n\n Junto con saludar, se ha recibido una solicitud de inversión de <strong style="font-size: 18px;">${investmentAmount} CLP</strong> por parte de cliente. \n\n Saludos cordiales, \n Vector Capital `,
            html: `Estimado/a, <br/><br/> Junto con saludar, se ha recibido una solicitud de inversión de <strong style="font-size: 18px;">${investmentAmount} CLP</strong> por parte de cliente. <br/><br/> Saludos cordiales,<br/> Vector Capital`,
        };

        // Envía el correo electrónico
        const info = await transporter.sendMail(mailOptions);

        ctx.status = 200;
        ctx.body = { message: 'Correo enviado a ejecutivo con éxito!', info };
    } catch (error) {
        ctx.throw(500, error);
    }
});

module.exports = router;
