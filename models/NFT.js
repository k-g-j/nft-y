const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class NFT extends Model { }

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
            unique: false
        },

        unique_name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },

        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        users_name: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: "id"
            }
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