// Prepared for icebox - Not in use
const express = require("express");
const router = express.Router();

const {
  fetchBookings,
  listBookings,
  updateBooking,
  removeBooking,
  detailBooking,
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

router.put("/:bookingId", updateBooking);

router.delete("/:bookingId", removeBooking);

router.get("/:bookingId", detailBooking);

module.exports = router;
