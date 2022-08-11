//import database connection from config folder
const sequelize = require('../config/connection');

//import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

//library for password 
// const bcrypt = require('bcrypt');

//initialize User model by extending off sequelize model class
class User extends Model {
    // checkPassword(loginPw){
    //     return bcrypt.compareSync(loginPw, this.password);
    // }
}

//User table declaration
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
   // {
      //  hooks: {
        //    beforeCreate: async (newUserData) => {
          //      newUserData.password = await bcrypt.hash(newUserData.password, 10);
            //    return newUserData;
            //},
            //beforeUpdate: async (updatedUserData) => {
              //  updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                //return updatedUserData;
            //},
       // }
    //},
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'user',
    }
);

module.exports = User;