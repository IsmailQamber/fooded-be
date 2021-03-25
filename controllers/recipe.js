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

exports.addRecipe = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201);
    res.json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await req.recipe.update(req.body);
    res.status(204);
    res.json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

exports.removeRecipe = async (req, res, next) => {
  try {
    await req.recipe.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
