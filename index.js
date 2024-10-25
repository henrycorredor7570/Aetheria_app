import app from "./src/app.js";
import { conn } from "./src/db.js";
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

conn.sync({ alter: true }).then(() => { //permite actualizar la estructura de la base de datos en función de los cambios en los modelos, sin perder datos existentes.
    app.listen(PORT, () => {
        console.log(`server connected to port: ${PORT}`);
    })
});