module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        DateValidate(value) {
          if (Date.now() > value) {
            throw new Error("Session date should be after today");
          }
        },
      },
    },
    time: { type: DataTypes.TIME },
  });

  return Session;
};
