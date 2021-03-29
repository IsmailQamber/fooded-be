const { Op } = require("sequelize");
const { Chef } = require("../db/models");

exports.chefsList = async (req, res, next) => {
  try {
    const chefs = await Chef.findAll();
    res.status(200);
    res.json(chefs);
  } catch (error) {
    next(error);
  }
};
