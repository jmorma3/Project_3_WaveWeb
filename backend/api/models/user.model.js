const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const User = sequelize.define(
    'user',
    {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_type: {
            type: DataTypes.ENUM('admin', 'dev', 'client'),
            allowNull: false,         
        },
    },
    { timestamps: false }
)

module.exports = User