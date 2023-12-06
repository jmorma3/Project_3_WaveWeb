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
            type: DataTypes.ENUM("Not Started", "In Progress Step 1", "In Progress Step 2", "Completed"), 
            allowNull: false
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