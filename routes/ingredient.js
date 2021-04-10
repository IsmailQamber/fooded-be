const express = require("express");
const router = express.Router();

const {
  listIngredient,
  createIngredient,
} = require("../controllers/ingredient");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipes(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({ status: 404, message: "recipe not found" });
  }
});

router.get("/", listIngredient);

router.post("/", createIngredient);

module.exports = router;
