const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  fetchSessions,
  listSessions,
  searchSession,
  addBooking,
} = require("../controllers/session");

router.param("sessionId", async (req, res, next, sessionId) => {
  const session = await fetchSessions(sessionId, next);
  if (session) {
    req.session = session;
    next();
  } else {
    next({ status: 404, message: "session not found" });
  }
});

router.get("/", listSessions);

router.post("/search", searchSession);

router.post(
  "/:sessionId/booking",
  passport.authenticate("jwt", { session: false }),
  addBooking
);

module.exports = router;
