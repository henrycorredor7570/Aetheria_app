import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, name, verificationUrl) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Verifica tu correo en Aetheria",
        html: `<p>Hola ${name}, haz click en el siguiente enlace para verificar tu correo:</p>
                <a href="${verificationUrl}>${verificationUrl}</a>`
    })
}