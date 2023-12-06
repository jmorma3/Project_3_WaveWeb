const router = require("express").Router()

const { checkAdmin } = require("../middlewares/index")

const {
    getAllMessages,
    getOneMessage,
    getOwnMessages,
    getOneOwnMessage,
    createMessage,
    updateMessage,
    updateOwnMessage,
    deleteMessage,
    deleteOwnMessage
} = require("../controllers/chat_message.controller")

router
    .get("/", checkAdmin, getAllMessages)
    .get("/:messageId", checkAdmin, getOneMessage)
    .get("/myMessages", getOwnMessages)
    .get("/myMessages/:messageId", getOneOwnMessage)
    .post("/", createMessage)
    .put("/:messageId", checkAdmin, updateMessage)
    .put("/myMessages/:messageId", updateOwnMessage)
    .delete("/:messageId", deleteMessage)
    .delete("/myMessages/:messageId", deleteOwnMessage)




module.exports = router