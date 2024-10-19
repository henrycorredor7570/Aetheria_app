import app from "./src/app.js";
import conn from "./src/db.js";
require('dotenv').config();
const PORT = process.env.PORT || 3000;

conn.sync({ alter: true }).then(() => {
    app(PORT, () => {
        console.log(`server connected to port: ${PORT}`);
    })
});