const express = require("express");
const router = express.Router();

const {
  fetchRecipes,
  listRecipes,
  detailRecipe,
} = require("../controllers/recipe");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipes(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({ status: 404, message: "recipe not found" });
  }
});

router.get("/", listRecipes);

router.get("/:recipeId", detailRecipe);

module.exports = router;
