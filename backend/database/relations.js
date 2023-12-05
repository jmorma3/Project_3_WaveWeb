//Requerir los diferentes modelos una vez estén creados...
const Agenda = require("../api/models/agenda.model")
const ChatMessage = require("../api/models/chat_message.model")
const Invoice = require("../api/models/invoice.model")
const Project = require("../api/models/project.model")
const User = require("../api/models/user.model")

function addRelationsToModels(){
    try {
        //One to Many:
        User.hasMany(Project)
        Project.belongsTo(User)

        User.hasMany(Agenda)
        Agenda.belongsTo(User)

        User.hasMany(Invoice)
        Invoice.belongsTo(User)

        Project.hasMany(Agenda)
        Agenda.belongsTo(Project)

        Project.hasMany(Invoice)
        Invoice.belongsTo(Project)

        Project.hasMany(ChatMessage)
        ChatMessage.belongsTo(Project)

        User.hasMany(ChatMessage)
        ChatMessage.belongsTo(User)

        //Many to Many:
        User.belongsToMany(Project, {through: "project_developers", timestamps: false})
        Project.belongsToMany(User, {through: "project_developers", timestamps: false})

        console.log("Relations added to models!")

    } catch (error) {
        throw error
    }
} 

module.exports = addRelationsToModels