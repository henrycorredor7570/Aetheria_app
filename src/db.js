import { Sequelize } from "sequelize";
import { readdirSync } from "fs";
import { basename as _basename, join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

import dotenv from 'dotenv';
dotenv.config();

const {DB_USER,DB_PASSWORD,DB_HOST,DB_NAME,DATABASE_URL,DB_SSL} = process.env; 

const connectionString = DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const sequelizeOptions = {
  logging: false,
  native: false,
  pool: {max:5, min:0, idle: 1000},
};

if (DB_SSL === "true" || (connectionString && connectionString.includes("sslmode=require"))){
  sequelizeOptions.dialectOptions = {ssl: {require:true, rejectUnauthorized: false}};
};

const sequelize = new Sequelize(connectionString, sequelizeOptions);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);

const modelDefiners = [];

// Leer todos los archivos de modelos en la carpeta 'models' e importarlos de forma asíncrona
const loadModels = async () => {
  const modelFiles = readdirSync(join(__dirname, "models"))
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");

  // Usar Promise.all para asegurar que todos los modelos se cargan antes de continuar
  await Promise.all(
    modelFiles.map(async (file) => {
      // Convertimos la ruta a un URL compatible con ESM
      const model = await import(pathToFileURL(join(__dirname, "models", file)));
      modelDefiners.push(model.default || model);
    })
  );

  // Inyectar la conexión (sequelize) a todos los modelos
  modelDefiners.forEach((model) => model(sequelize, Sequelize.DataTypes));

  // Capitalizar nombres de los modelos
  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1]
  ]);
  sequelize.models = Object.fromEntries(capsEntries);

  // Asociaciones entre modelos
  const { User, Review, Visit, Destination, PointOfInterest, ARModel } = sequelize.models;

  if (User) {
    User.hasMany(Review, { foreignKey: 'user_id' });
    User.hasMany(Visit, { foreignKey: 'user_id' });
  }

  if (Review) {
    Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    Review.belongsTo(Destination, { foreignKey: 'destination_id', as: 'destination' });
  }

  if (Visit) {
    Visit.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    Visit.belongsTo(Destination, { foreignKey: 'destination_id', as: 'destination' });
  }

  if (Destination) {
    Destination.hasMany(Review, { foreignKey: 'destination_id', as: 'reviews' });
    Destination.hasMany(PointOfInterest, { foreignKey: 'destination_id', as: 'pointsOfInterest' });
    Destination.hasMany(ARModel, { foreignKey: 'destination_id', as: 'arModels' });
    Destination.hasMany(Visit, { foreignKey: 'destination_id', as: 'visits' });
  }

  if (PointOfInterest) {
    PointOfInterest.belongsTo(Destination, { foreignKey: 'destination_id', as: 'destination' });
    PointOfInterest.hasMany(ARModel, { foreignKey: 'point_of_interest_id', as: 'arModels' });
  }

  if (ARModel) {
    ARModel.belongsTo(Destination, { foreignKey: 'destination_id', as: 'destination' });
    ARModel.belongsTo(PointOfInterest, { foreignKey: 'point_of_interest_id', as: 'pointsOfInterest' });
  }
};

// Ejecutar la carga de modelos
await loadModels();

export const { User, Review, Visit, Destination, PointOfInterest, ARModel } = sequelize.models;

export const conn = sequelize;

export default {
  ...sequelize.models,
};
