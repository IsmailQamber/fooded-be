const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
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
  });
  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["username"],
  });
  return User;
};
