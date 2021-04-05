module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        DateValidate(value) {
          if (value > Date.now()) {
            throw new Error("Session date should be after today");
          }
        },
      },
    },
    time: { type: DataTypes.TIME, allowNull: false },
    zoom: { type: DataTypes.STRING },
  });

  return Session;
};
