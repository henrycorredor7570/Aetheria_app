import { Router } from "express";
import passport from "../services/googleAuthService.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

//Inicia el login con google, redirige al usuario a Google para autorizar la app.
authRouter.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));//scope indica qué permisos pides: profile (nombre, foto, id) y email.

//callback de google
authRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login"}),
    (req,res) => {
        //para generar un token que el frontend consumirá.
        const token = jwt.sign(
            { id: req.user.id, email: req.user.email, role: req.user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        //redirige al frontedn con el token (se puede usar query params o localStorage)
        res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
    }
);

export default authRouter;