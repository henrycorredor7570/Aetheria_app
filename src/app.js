import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes/index.js';

import "./db.js";

const app = express();
// app.name = "API";

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000
}));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*"); //ajustar en produccion: res.header("Access-Control-Allow-Origin", "https://tu-dominio.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.options("", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); //ajustar en produccion: res.header("Access-Control-Allow-Origin", "https://tu-dominio.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.sendStatus(204);
});

app.use("/", routes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

export default app;