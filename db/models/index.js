"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Chef.hasMany(db.Recipe, { as: "recipes", foreignKey: "chefId" });
db.Recipe.belongsTo(db.Chef, { as: "chef" });

db.User.hasOne(db.Chef, { as: "chef", foreignKey: "userId" });
db.Chef.belongsTo(db.User, { as: "user" });

db.Recipe.hasMany(db.Session, { as: "session", foreignKey: "recipeId" });
db.Session.belongsTo(db.Recipe, { as: "recipe" });

db.Session.hasMany(db.Booking, { as: "booking", foreignKey: "sessionId" });
db.Booking.belongsTo(db.Session, { as: "session" });

db.User.hasMany(db.Booking, { as: "booking", foreignKey: "sessionId" });
db.Booking.belongsTo(db.User, { as: "user" });

module.exports = db;
