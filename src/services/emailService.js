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
        html: `
            <div style="font-family: Arial, sans-serif; color: #222;">
                <h2>¡Bienvenida/o a Aetheria, ${name}!</h2>
                <p>Gracias por registrarte. Para activar tu cuenta, por favor haz clic en el siguiente botón:</p>
                <a href="${verificationUrl}"
                    style="display:inline-block; padding:12px 24px, background:#4f46e5; color:#fff; border-radius:6px; text-decoration:none; font-weight:bold; margin:16px 0;">
                    Verificar mi correo
                </a>
                <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                <p style="font-size:12px; color:#555;">${verificationUrl}</p>
                <br>
                <p>¡Gracias por confiar en nosotros!</p>
                <p style="font-size:13px; color:#888;">Equipo Aetheria</p>
            </div>
        `
    })
}