const { Recipe } = require("../db/models");

exports.fetchRecipes = async (recipeId, next) => {
  try {
    return (found = await Recipe.findByPk(recipeId));
  } catch (error) {
    next(error);
  }
};

exports.listRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200);
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.detailRecipe = async (req, res, next) => {
  try {
    const detailRecipe = await req.recipe;
    res.status(200).json(detailRecipe);
  } catch (error) {
    next(error);
  }
};
