const { Cuisine } = require("../db/models");

exports.fetchCuisines = async (cuisineId, next) => {
  try {
    return (found = await Cuisine.findByPk(cuisineId));
  } catch (error) {
    next(error);
  }
};

exports.listCuisines = async (req, res, next) => {
  try {
    const cuisines = await Cuisine.findAll();
    res.status(200);
    res.json(cuisines);
  } catch (error) {
    next(error);
  }
};

exports.addCuisine = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCuisine = await Cuisine.create(req.body);
    res.status(201);
    res.json(newCuisine);
  } catch (error) {
    next(error);
  }
};

exports.updateCuisine = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const updatedCuisine = await req.cuisine.update(req.body);
    res.status(200).json(updatedCuisine);
  } catch (error) {
    next(error);
  }
};

exports.detailCuisine = async (req, res, next) => {
  try {
    const detailCuisine = await req.cuisine;
    res.status(200).json(detailCuisine);
  } catch (error) {
    next(error);
  }
};

exports.removeCuisine = async (req, res, next) => {
  try {
    await req.cuisine.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
