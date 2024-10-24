import app from "./src/app.js";
import { conn } from "./src/db.js";
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

conn.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`server connected to port: ${PORT}`);
    })
});