const { Sequelize } = require('sequelize')
require('dotenv').config()

// console.log(process.env.MYSQLUSER, process.env.MYSQLPASSWORD, process.env.MYSQLHOST, process.env.MYSQLPORT, process.env.MYSQL_DATABASE)
const connection = new Sequelize(`mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`);
async function checkConnection() {
    try {
        await sequelize.authenticate()
        console.log('Connection to DB has been established successfully.')
    } catch (error) {
        throw error
    }
}

async function syncModels(value) {
    const state = {
        // alter: { alter: true },
        //  force: { force: true },
    }

    try {
        await sequelize.sync(state[value] || '')
        console.log(`All models were synchronized successfully using sync(${JSON.stringify(state[value]) || ''}).`)
    } catch (error) {
        throw error
    }
}

module.exports = { sequelize, checkConnection, syncModels }