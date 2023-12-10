const ChatMessage = require("../models/chat_message.model")
const Project = require("../models/project.model")
const User = require("../models/user.model")
const { Op } = require("sequelize")

const getAllMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.findAll({
            where: req.query
        })
        if (messages) {
            return res.status(200).json(messages)
        } else {
            return res.status(404).send("No messages found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneMessage = async (req, res) => {
    try {
        const message = await ChatMessage.findByPk(req.params.messageId)
        if (message) {
            return res.status(200).json(message)
        } else {
            return res.status(404).send("Message not found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getProjectChatMessages = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        // Verifica si el usuario actual está asociado al proyecto (ya sea dev o client)
        const isUserAssociated = await Project.findOne({
            where: {
                id: projectId,
                [Op.or]: [
                    { devId: res.locals.user.id },
                    { clientId: res.locals.user.id }
                ]
            }
        });

        if (!isUserAssociated) {
            return res.status(403).send('You are not authorized to view chat messages for this project.');
        }

        // Obtiene todos los mensajes de chat asociados al proyecto
        const chatMessages = await ChatMessage.findAll({
            where: {
                projectId: projectId
            },
            attributes: ["id", "message_text", 'message_date', 'message_time', "userId"],

        });

        if (chatMessages) {
            const message = `Chat messages for Project ${projectId}:`;
            return res.status(200).json({ message, chatMessages });
        } else {
            return res.status(404).send('Chat messages not found for this project.');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



const createMessage = async (req, res) => {
    try {
        const { projectId, message_text, message_date, message_time, userId } = req.body

        const message = await ChatMessage.create({
            projectId: projectId,
            message_text: message_text,
            message_date: message_date,
            message_time: message_time,
            userId: userId

        })

        return res.status(200).json({ message: 'Message created', message: message })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateMessage = async (req, res) => {
    try {
        const [message] = await ChatMessage.update({
            messageId: req.body.messageId,
            message_text: req.body.message_text,
            message_date: req.body.message_date,
            message_time: req.body.message_time

        }, {
            where: {
                id: req.params.messageId
            }
        })

        if (message) {
            return res.status(200).json({ message: 'Message updated' })
        } else {
            return res.status(404).send('Message not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateOwnMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;

        const message = await ChatMessage.findOne({
            where: {
                id: messageId,
                userId: res.locals.user.id
            }
        });

        if (message) {
            await ChatMessage.update(req.body, {
                where: {
                    id: messageId
                }
            });

            return res.status(200).json({ message: 'Message updated' });
        } else {
            return res.status(404).send('Message not found or you do not have permission to update it');
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const deleteMessage = async (req, res) => {
    try {
        const message = await ChatMessage.destroy({
            where: {
                id: req.params.messageId
            }
        })

        if (message) {
            return res.status(200).json({ message: 'Message deleted' })
        } else {
            return res.status(404).send('Message not found')
        }

    } catch (error) {
        return res.status(500).send(error.message)

    }
}


const deleteOwnMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;

        const message = await ChatMessage.findOne({
            where: {
                id: messageId,
                userId: res.locals.user.id
            }
        });

        if (message) {
            await ChatMessage.destroy({
                where: {
                    id: messageId
                }
            });

            return res.status(200).json({ message: 'Message deleted' });
        } else {
            return res.status(404).send('Message not found or you do not have permission to delete it');
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
};


module.exports = {
    getAllMessages,
    getOneMessage,
    getProjectChatMessages,
    createMessage,
    updateMessage,
    updateOwnMessage,
    deleteMessage,
    deleteOwnMessage
}