const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class nftList extends Model {}

nftList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imageUrl: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    Addrs: {
      type: DataTypes.INTEGER,
      //references: {
        //model: 'user',
        //key: 'id'
      //}
    },
    project_name: {
      type: DataTypes.INTEGER,
      //references: {
        //model: 'user',
        //key: 'id'
      //}
    },
    users_name: {
      type: DataTypes.INTEGER,
      //references: {
        //model: 'user',
        //key: 'id'
      //}
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'nftList'
  }
);

module.exports = nftList;