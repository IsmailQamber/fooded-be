const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  fetchChefs,
  listChefs,
  addChef,
  updateChef,
  removeChef,
  detailChef,
  searchChefs,
  addRecipe,
  updateRecipe,
  removeRecipe,
  addSession,
} = require("../controllers/chef");
const { fetchRecipes } = require("../controllers/recipe");

router.param("chefId", async (req, res, next, chefId) => {
  const chef = await fetchChefs(chefId, next);
  if (chef) {
    req.chef = chef;
    next();
  } else {
    next({ status: 404, message: "chef not found" });
  }
});

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipes(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({ status: 404, message: "recipe not found" });
  }
});

router.get("/", listChefs);

router.post("/", upload.single("image"), addChef);

router.put("/:chefId", upload.single("image"), updateChef);

router.delete("/:chefId", removeChef);

router.get("/:chefId", detailChef);

router.post("/search", searchChefs);

router.post(
  "/:chefId/recipes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  addRecipe
);

router.put(
  "/:chefId/recipes/:recipeId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateRecipe
);

router.delete(
  "/:chefId/recipes/:recipeId",
  passport.authenticate("jwt", { session: false }),
  removeRecipe
);

router.post(
  "/:chefId/sessions",
  passport.authenticate("jwt", { session: false }),
  addSession
);

module.exports = router;
