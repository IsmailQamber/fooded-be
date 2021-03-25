const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 10],
      },
    },
    isChef: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["username"],
  });
  return User;
};
