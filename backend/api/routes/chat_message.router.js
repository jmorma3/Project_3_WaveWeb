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
    .get("/myMessages", getOwnMessages)
    .get("/", checkAdmin, getAllMessages)
    .get("/:messageId", checkAdmin, getOneMessage)
    .get("/myMessages/:messageId", getOneOwnMessage)
    .post("/", createMessage)
    .put("/myMessages/:messageId", updateOwnMessage)
    .put("/:messageId", checkAdmin, updateMessage)
    .delete("/:messageId", deleteMessage)
    .delete("/myMessages/:messageId", deleteOwnMessage)




module.exports = router