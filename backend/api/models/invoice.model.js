const { DataTypes } = require('sequelize')
const {sequelize} = require("../../database")

const Invoice = sequelize.define(
    "invoice", 
    {
       invoice_date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDateValid(value) {
                    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                    if (!dateRegex.test(value)) {
                        throw new Error('Incorrect date. Use the format YYYY-MM-DD.');
                    }
                }
            }
        }, 
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        }, 
        payment_date:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDateValid(value) {
                    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                    if (!dateRegex.test(value)) {
                        throw new Error('Incorrect date. Use the format YYYY-MM-DD.');
                    }
                }
            }
        }, 
        payment_method: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        payment_currency: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }, 
    {
        timestamps: false
    }
)

module.exports = Invoice