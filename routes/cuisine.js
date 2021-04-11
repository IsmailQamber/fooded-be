const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();

const {
  fetchCuisines,
  listCuisines,
  updateCuisine,
  removeCuisine,
  detailCuisine,
  addCuisine,
} = require("../controllers/cuisine");

router.param("cuisineId", async (req, res, next, cuisineId) => {
  const cuisine = await fetchCuisines(cuisineId, next);
  if (cuisine) {
    req.cuisine = cuisine;
    next();
  } else {
    next({ status: 404, message: "cuisine not found" });
  }
});

router.get("/", listCuisines);

router.post("/", upload.single("image"), addCuisine);

router.put("/:cuisineId", upload.single("image"), updateCuisine);

router.delete("/:cuisineId", removeCuisine);

router.get("/:cuisineId", detailCuisine);

module.exports = router;
