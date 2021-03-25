const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const passport = require("passport");

router.post("/signup", controller.signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  controller.signin
);

router.put(
  "/userUpdate",
  passport.authenticate("jwt", { session: false }),
  controller.userUpdate
);

router.get(
  "/userView",
  passport.authenticate("jwt", { session: false }),
  controller.userFetch
);

module.exports = router;
