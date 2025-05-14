export const roleMiddleware = (requiredRole) => {// requiredRole: El rol requerido para acceder a la ruta (por ejemplo, "admin" o "user").
    return (req, res, next) => {
        //Verificamos si el usuario autenticado tiene el rol necesario:
        const userRole = req.user.role; //el rol del usuario debe estar incluido en el token jwt

        if(!userRole || userRole !== requiredRole){
            return res.status(403).json({error:"Acceso denegado. No tienes los permisos necesarios."});
        }
        next();
    };
};