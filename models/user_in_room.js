'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_in_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_in_room.init({
    id_room: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    pilihan_tangan: DataTypes.INTEGER,
    permainan_ke: DataTypes.INTEGER,
    point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_in_room',
  });
  return user_in_room;
};