const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const passport = require("passport");
const upload = require("../middleware/multer");

router.post("/signup", upload.single("image"), controller.signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  controller.signin
);

router.put(
  "/userUpdate",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controller.userUpdate
);

router.get(
  "/userView",
  passport.authenticate("jwt", { session: false }),
  controller.userFetch
);

router.get("/users", controller.usersList);
module.exports = router;
