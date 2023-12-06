const ChatMessage = require("../models/chat_message.model")

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

const getOwnMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.findAll({
            where: {
                userId: res.locals.user.id
            }
        })
        if (messages) {
            return res.status(200).json(messages)
        } else {
            return res.status(404).send('Message not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneOwnMessage = async (req, res) => {
    try {
        const message = await ChatMessage.findByPk(req.params.messageId, {
            where: {
                userId: res.locals.user.id
            }
        })
        if (message) {
            return res.status(200).json(message)
        } else {
            return res.status(404).send('Message not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createMessage = async (req, res) => {
    try {
        const { message_text, message_date, message_time, userId } = req.body

        const message = await ChatMessage.create({
            message_text: message_text,
            message_date: message_date,
            message_time: message_time,
            userId: res.locals.user.id
            
          
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
            const message = await ChatMessage.findOne({
                where: {
                    userId: res.locals.user.id
                }
            })
    
            if (message) {
                await ChatMessage.update(req.body, {
                    where: {
                        id: req.params.messageId
                    }
                })
                return res.status(200).json({ message: 'Message updated' })
            }else {
                return res.status(404).send('Message not found')
            }
    
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

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
        const message = await ChatMessage.findOne({
            where: {
                userId: res.locals.user.id
            }
        })

        if (message) {
            await ChatMessage.destroy( {
                where: {
                    id: req.params.messageId
                }
            })
            return res.status(200).json({ message: 'Message deleted' })
        }else {
            return res.status(404).send('Message not found')
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports ={
    getAllMessages,
    getOneMessage,
    getOwnMessages,
    getOneOwnMessage,
    createMessage,
    updateMessage,
    updateOwnMessage,
    deleteMessage,
    deleteOwnMessage
}