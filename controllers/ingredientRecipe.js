const { IngredientRecipe } = require("../db/models");
exports.listIngredientRecipe = async (req, res, next) => {
  try {
    const ingredientsRecipe = await IngredientRecipe.findAll();
    res.status(200);
    res.json(ingredientsRecipe);
  } catch (error) {
    next(error);
  }
};
