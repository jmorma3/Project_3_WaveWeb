const router = require("express").Router()

const {
    signUp,
    logIn
} = require("../controllers/auth.controller")

router
    .post("/login", logIn)
    .post("/signup", signUp)
    

module.exports = router