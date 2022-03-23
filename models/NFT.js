const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class NFT extends Model {}

// define table columns and configuration
NFT.init(
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
        unique: true
      },
      current_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'NFT'
  }
);

module.exports = NFT;