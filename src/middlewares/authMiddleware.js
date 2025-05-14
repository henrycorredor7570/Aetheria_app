import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

//Middleware para proteger mis rutas deseadas (funcion que verifica si el token es valido):
export const authMiddleware = (req,res,next) => {
    //Obtenemos el token del encabezado de autorización:
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error:"token no proporcionado o formato inválido."});
    }

    const token = authHeader.split(" ")[1]; // extraemos el token despues de espacio que hay despues del Bearer

    try {
        // verificamos el token
        const decoded = jwt.verify(token, SECRET_KEY);

        //adjuntamos los datos del usuario al objeto req para usarlos en las rutas protegidas
        req.user = decoded;
        next();
    } catch(error){
        return res.status(401).json({ error: "Token inválido o expirado."});
    }
}