const express = require("express");
const router = express.Router();

const {
  fetchSessions,
  listSessions,
  addSession,
  updateSession,
  removeSession,
  searchSession,
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

// router.post("/", addSession);

router.put("/:sessionId", updateSession);

router.delete("/:sessionId", removeSession);

router.post("/search", searchSession);

module.exports = router;
