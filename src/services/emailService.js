import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, name, verificationUrl) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
//Son las credenciales del correo electrónico que mi aplicación usará para ENVIAR los correos (por ejemplo, los de verificación).
// son el correo y la pass de la cuenta desde la que el backend enviará los emails.
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verifica tu correo en Aetheria",
        html: `<p>Hola ${name}, haz click en el siguiente enlace para verificar tu correo:</p>
                <a href="${verificationUrl}>${verificationUrl}</a>`
    })
}