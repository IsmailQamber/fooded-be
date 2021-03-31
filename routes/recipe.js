const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  fetchRecipes,
  listRecipes,
  addRecipe,
  updateRecipe,
  removeRecipe,
  detailRecipe,
  searchRecipes,
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

// router.post("/", upload.single("image"), addRecipe);

// router.put("/:recipeId", upload.single("image"), updateRecipe);

// router.delete("/:recipeId", removeRecipe);

router.get("/:recipeId", detailRecipe);

router.post("/search", searchRecipes);

module.exports = router;
