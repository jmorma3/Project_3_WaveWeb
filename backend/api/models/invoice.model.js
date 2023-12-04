const { DataTypes } = require('sequelize')
const {sequelize} = require("../../database")

const Invoice = sequelize.define(
    "invoice", 
    {
       invoiceDate: {
            type: DataTypes.DATE, 
            allowNull: false
        }, 
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        }, 
        paymentDateTime:{
            type: DataTypes.DATE, 
            allowNull: false
        }, 
        paymentMethod: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }, 
    {
        timestamps: false
    }
)

module.exports = Invoice