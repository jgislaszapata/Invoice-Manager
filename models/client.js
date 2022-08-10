//Import database connection from config folder
const sequelize = require('../config/connection');

//import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

//initialize Client model (table) by extending off Sequelize model class
class Client extends Model { }

//Client table declaration
Client.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        client_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        client_phone: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'client',
    }
);

module.exports = Client;
