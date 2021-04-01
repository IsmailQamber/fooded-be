const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  fetchBookings,
  listBookings,
  addBooking,
  updateBooking,
  removeBooking,
  detailBooking,
  searchBookings,
} = require("../controllers/booking");

router.param("bookingId", async (req, res, next, bookingId) => {
  const booking = await fetchBookings(bookingId, next);
  if (booking) {
    req.booking = booking;
    next();
  } else {
    next({ status: 404, message: "booking not found" });
  }
});

router.get("/", listBookings);

// router.post("/", addBooking);

router.put("/:bookingId", updateBooking);

router.delete("/:bookingId", removeBooking);

router.get("/:bookingId", detailBooking);

router.post("/search", searchBookings);

module.exports = router;
