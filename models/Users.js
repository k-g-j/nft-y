const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Users extends Model {}

// define table columns and configuration
Projects.init(
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
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'projects'
  }
);

module.exports = Projects;