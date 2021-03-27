module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    { qty: { type: DataTypes.INTEGER } },
    { timestamps: false }
  );

  return Booking;
};
