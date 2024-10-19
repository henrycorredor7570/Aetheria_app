import { Sequelize } from "sequelize";
import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import 'dotenv/config';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false, native: false });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);

const modelDefiners = [];

readdirSync(join(__dirname, "/models"))
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach( async (file) => { 
      const model = await import(join(__dirname, "/models", file));
      modelDefiners.push(model.default || model);
    });

// Inyectar la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizar nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1]
]);
sequelize.models = Object.fromEntries(capsEntries);
console.log(sequelize.models);
// Asociaciones entre modelos
const { User, Review, Visit, Destination, PointOfInterest, ARModel } = sequelize.models;

User.hasMany(Review, {foreignKey: 'user_id'}); // Un usuario puede escribir muchas reseñas 
User.hasMany(Visit, {foreignKey: 'user_id'}); // Un usuario puede tener muchas visitas 
Review.belongsTo(User, {foreignKey: 'user_id', as: 'user'}); // Pertenece a un usuario 
Review.belongsTo(Destination, {foreignKey: 'destination_id', as: 'destination'}); //Pertenece a un destino 
Visit.belongsTo(User, {foreignKey: 'user_id', as: 'user'}); // Pertenece a un usuario 
Visit.belongsTo(Destination, {foreignKey: 'destination_id', as: 'destination'}); // Pertenece a un destino 
Destination.hasMany(Review, {foreignKey: 'destination_id', as: 'reviews'}); // Un destino puede tener muchas reseñas 
Destination.hasMany(PointOfInterest, {foreignKey: 'destination_id', as: 'pointsOfInterest'}); // Un destino puede tener muchos puntos de interés 
Destination.hasMany(ARModel, {foreignKey: 'destination_id', as: 'arModels'}); // Un destino puede tener muchos modelos AR 
Destination.hasMany(Visit, {foreignKey: 'destination_id', as: 'visits'}); //  Un destino puede tener muchas visitas registradas.
PointOfInterest.belongsTo(Destination, {foreignKey: 'destination_id', as: 'destination'}); // Pertenece a un destino
PointOfInterest.hasMany(ARModel, {foreignKey: 'point_of_interest_id', as: 'arModels'}); // Puede tener muchos modelos AR
ARModel.belongsTo(Destination, {foreignKey: 'destination_id', as: 'destination'}); // Pertenece a un destino
ARModel.belongsTo(PointOfInterest, {foreignKey: 'point_of_interest_id', as: 'pointsOfInterest'}); // Puede pertenecer a un punto de interés

export default {
  ...sequelize.models, 
  conn: sequelize, 
};