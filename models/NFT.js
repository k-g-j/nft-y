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
            unique: true
        },

        imageurl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        //ADDRESS
        addrs: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isURL: true
            }
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        projects_name: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'projects',
                key: "id"
            }
        },

        users_name: {
            type: DataTypes.STRING,
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