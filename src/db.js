import { Sequelize } from "sequelize";
import { readdirSync } from "fs";
import { basename as _basename, join } from "path";

import 'dotenv/config';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false, native: false });

const basename = _basename(__filename);

const modelDefiners = [];

readdirSync(join(__dirname, "/models"))
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => { modelDefiners.push(require(join(__dirname, "/models", file)))});

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1]
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Review } = sequelize.models;

User.hasMany()

export default {
  ...sequelize.models, 
  conn: sequelize, 
};
