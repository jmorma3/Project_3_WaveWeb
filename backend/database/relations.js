//Requerir los diferentes modelos una vez estén creados...
const Agenda = require("../api/models/agenda.model")
const ChatMessage = require("../api/models/chat_message.model")
const Invoice = require("../api/models/invoice.model")
const Project = require("../api/models/project.model")
const User = require("../api/models/user.model")

function addRelationsToModels() {
    try {
        //One to Many:
        // Relaciones en la tabla Project
        Project.belongsTo(User, { foreignKey: 'devId', as: 'developer' });
        Project.belongsTo(User, { foreignKey: 'clientId', as: 'client' });

        // Relaciones en la tabla Invoice
        Invoice.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
        Invoice.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
        Invoice.belongsTo(User, { foreignKey: 'devId', as: 'developer' });

        // Relaciones en la tabla Agenda (anteriormente conocida como Meeting)
        Agenda.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
        Agenda.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
        Agenda.belongsTo(User, { foreignKey: 'devId', as: 'developer' });

        // Relaciones en la tabla ChatMessage
        ChatMessage.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
        ChatMessage.belongsTo(User, { foreignKey: 'userId', as: 'user' });

        console.log("Relations added to models!")

    } catch (error) {
        throw error
    }
}

module.exports = addRelationsToModels