const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Cuisine = sequelize.define(
    "Cuisine",
    { name: { type: DataTypes.STRING, unique: true } },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Cuisine, {
    source: ["name"],
  });
  return Cuisine;
};
