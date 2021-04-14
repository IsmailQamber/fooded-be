module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.TEXT },
  });
  return Ingredient;
};
