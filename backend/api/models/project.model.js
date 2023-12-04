const { DataTypes } = require('sequelize')
const {sequelize} = require("../../database")

const Project = sequelize.define(
    "project", 
    {
        projectName: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        projectType: {
            type: DataTypes.ENUM("Basic Web", "Dynamic Web", "E-Commerce Web"),
            allowNull: false
        }, 
        price:{
            type: DataTypes.FLOAT, 
            allowNull: false
        }, 
        progressStatus: {
            type: DataTypes.ENUM("Finished", "Unfinished"), 
            allowNull: false
        }, 
        plusPrototype: {
            type: DataTypes.BOOLEAN, 
            allowNull: false
        }
    }, 
    {
        timestamps: false
    }
)

module.exports = Project