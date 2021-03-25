const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredientDescription: { type: DataTypes.STRING, allowNull: false },
  });
  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["name"],
  });
  return Recipe;
};
