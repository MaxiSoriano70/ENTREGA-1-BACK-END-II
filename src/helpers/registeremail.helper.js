import { createTransport } from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
    },
});

const sendEmailOfRegister = async ({ email, verifyCode }) =>
    await transport.sendMail({
        from: `MI COMERCIO DIGITAL <${process.env.GOOGLE_EMAIL}>`,
        to: email,
        subject: "MAIL DE VERIFICACION DE CUENTA",
        html: `<h1>CODIGO PARA VERIFICAR LA CUENTA: ${verifyCode}</h1>`,
});

export default sendEmailOfRegister;