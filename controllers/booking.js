const { Op } = require("sequelize");
const { Booking } = require("../db/models");

exports.fetchBookings = async (bookingId, next) => {
  try {
    return (found = await Booking.findByPk(bookingId));
  } catch (error) {
    next(error);
  }
};

exports.listBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.searchBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// exports.addBooking = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     console.log(req.body.image);
//     const newBooking = await Booking.create(req.body);
//     res.status(201);
//     res.json(newBooking);
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateBooking = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const updatedBooking = await req.booking.update(req.body);
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

exports.detailBooking = async (req, res, next) => {
  try {
    const detailBooking = await req.booking;
    res.status(200).json(detailBooking);
  } catch (error) {
    next(error);
  }
};

exports.removeBooking = async (req, res, next) => {
  try {
    await req.booking.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
