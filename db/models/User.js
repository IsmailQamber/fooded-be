module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      username: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
      },
      firstName: {
        type: DataType.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataType.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          len: [8, 10],
        },
      },
      isChef: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
