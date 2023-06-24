'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_materi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sub_materi.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    id_materi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sub_materi',
  });
  return sub_materi;
};