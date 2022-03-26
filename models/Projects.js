const { TimestreamQuery } = require('aws-sdk');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Projects extends Model { }

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
            allowNull: TimestreamQuery,
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