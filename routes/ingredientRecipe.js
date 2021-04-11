const express = require("express");
const router = express.Router();

const { listIngredientRecipe } = require("../controllers/ingredientRecipe");

router.get("/", listIngredientRecipe);

module.exports = router;
