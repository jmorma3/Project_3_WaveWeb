const { DataTypes } = require('sequelize')
const {sequelize} = require("../../database")

const Project = sequelize.define(
    "project", 
    {
        project_name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        project_type: {
            type: DataTypes.ENUM("Basic Web", "Dynamic Web", "E-Commerce Web"),
            allowNull: false
        }, 
        price:{
            type: DataTypes.FLOAT, 
            allowNull: false
        }, 
        progress_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              isIn: [[0, 1, 2, 3]]  // Validar que solo acepte estos valores
            }
          },
        plus_prototype: {
            type: DataTypes.BOOLEAN, 
            allowNull: false
        }
    }, 
    {
        timestamps: false
    }
)

module.exports = Project