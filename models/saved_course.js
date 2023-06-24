'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class saved_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  saved_course.init({
    id_user: DataTypes.INTEGER,
    id_course: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'saved_course',
  });
  return saved_course;
};