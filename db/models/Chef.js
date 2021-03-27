const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Chef = sequelize.define(
    "Chef",
    { name: { type: DataTypes.STRING } },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Chef, {
    source: ["name"],
  });
  return Chef;
};
