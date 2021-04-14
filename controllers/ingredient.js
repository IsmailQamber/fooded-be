const { Ingredient, Recipe } = require("../db/models");

exports.fetchRecipes = async (recipeId, next) => {
  try {
    return (found = await Recipe.findByPk(recipeId));
  } catch (error) {
    next(error);
  }
};

exports.listIngredient = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200);
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201);
    res.json(ingredient);
  } catch (error) {
    next(error);
  }
};
