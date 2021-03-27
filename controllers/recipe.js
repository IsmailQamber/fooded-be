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
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newRecipe = await Recipe.create(req.body);
    res.status(201);
    res.json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const updatedRecipe = await req.recipe.update(req.body);
    res.status(200).json(updatedRecipe);
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

exports.removeRecipe = async (req, res, next) => {
  try {
    await req.recipe.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
