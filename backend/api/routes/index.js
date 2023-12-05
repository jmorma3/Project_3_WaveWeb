const router = require("express").Router()
const userRouter = require("./user.router")
const authRouter = require("./auth.router")

const { checkAuth } = require("../middlewares/index")

router
        .use("/auth", authRouter)
        .use("/user", checkAuth, userRouter)

module.exports = router