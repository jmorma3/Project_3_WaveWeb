const router = require("express").Router()
const authRouter = require("./auth.router")
const userRouter = require("./user.router")
const projectRouter = require("./project.router")
const agendaRouter = require("./agenda.router")
const invoiceRouter = require("./invoice.router")
const chat_messageRouter = require("./chat_message.router")




const { checkAuth } = require("../middlewares/index")

router
        .use("/auth", authRouter)
        .use("/user", checkAuth, userRouter)
        .use("/project", checkAuth,projectRouter)
        .use("/agenda", checkAuth,agendaRouter)
        .use("/invoice", checkAuth,invoiceRouter)
        .use("/message", checkAuth,chat_messageRouter)       

module.exports = router