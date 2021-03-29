const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
  fetchChefs,
  listChefs,
  addChef,
  updateChef,
  removeChef,
  detailChef,
  searchChefs,
} = require("../controllers/chef");

router.param("chefId", async (req, res, next, chefId) => {
  const chef = await fetchChefs(chefId, next);
  if (chef) {
    req.chef = chef;
    next();
  } else {
    next({ status: 404, message: "chef not found" });
  }
});

router.get("/", listChefs);

router.post("/", upload.single("image"), addChef);

router.put("/:chefId", upload.single("image"), updateChef);

router.delete("/:chefId", removeChef);

router.get("/:chefId", detailChef);

router.post("/search", searchChefs);

module.exports = router;
