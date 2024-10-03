import { Sequelize, sequelize } from "sequelize";
import { readdirSync } from "fs";
import { basename as _basename, join } from "path";

require('dotenv').config();
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

const { User, Product } = sequelize.models;

//RELACIONES ENTRE LAS TABLAS:
// Product.hasMany(Reviews);

//relación de muchos a muchos: En este caso, una categoría puede tener muchos productos, y un producto puede pertenecer a muchas categorías.
Categorie.belongsToMany(Product, {
  through: "categorie_product",//nombre de la tabla intermedia
  timestamps: false,
  as: "Products", //establecemos un alias para la relación.
});
Product.belongsToMany(Categorie, {
  through: "categorie_product",
  timestamps: false,
  as: "Categories",
});
//relacion de uno a muchos: usuario puede tener muchas ordenes
User.hasMany(Order, { foreignKey: "user_id", as: "Orders" });
//relacion de muchos a uno: cada orden o muchas ordenes pertenecen a un unico usuario.
Order.belongsTo(User, { foreignKey: "user_id" });

//relacion de uno a muchos: usuario puede tener muchas ordenes. Esto significa que una orden puede tener varios 
//detalles de orden asociados (por ejemplo, si una orden incluye varios productos o diferentes detalles).
Order.hasMany(OrderDetail, { foreignKey: "order_id", as: "OrderDetails" });
// relación de muchos a uno. Esto significa que cada OrderDetail pertenece a una única Order.
OrderDetail.belongsTo(Order, { foreignKey: "order_id" });

//un producto (Product) puede tener muchas reseñas (Review)
Product.hasMany(Review);
//ada reseña pertenece a un solo producto.
Review.belongsTo(Product);

//un usuario tiene una única reseña.
User.hasOne(Review);
//una reseña pertenece a un usuario
Review.belongsTo(User);

//un producto puede estar en muchos detalles de órdenes:Es decir, un producto puede ser parte de varias órdenes, cada una con sus propios detalles.
Product.hasMany(OrderDetail, { foreignKey: "product_id", as: "OrderDetails" });
//relación de muchos a uno. Esto significa que cada OrderDetail está asociado con un único Product.
OrderDetail.belongsTo(Product, { foreignKey: "product_id" });

//un usuario puede tener muchas compras
User.hasMany(Buy, {foreignKey: 'UserId'}); 
//cada compra está asociada con un solo usuario
Buy.belongsTo(User); 

//relación de muchos a muchos entre Product y Buy. Esto significa que un producto 
//puede estar en muchas compras y una compra puede contener muchos productos.
Product.belongsToMany(Buy, { through: 'ProductBuy' }); //tabla intermedia llamada ProductBuy
//relación de muchos a muchos, y Buy se asocia de vuelta con Product utilizando la misma tabla intermedia ProductBuy.
Buy.belongsToMany(Product, { through: 'ProductBuy' }); 


export default {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};