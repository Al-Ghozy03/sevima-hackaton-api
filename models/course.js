"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      course.hasMany(models.materi, { foreignKey: "id_course", as: "materi" });
      course.hasMany(models.rating, { foreignKey: "id_course"});
    }
  }
  course.init(
    {
      name: DataTypes.STRING,
      keyword: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "course",
    }
  );
  return course;
};
