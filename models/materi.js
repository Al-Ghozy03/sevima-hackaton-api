'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  materi.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    id_course: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'materi',
  });
  return materi;
};