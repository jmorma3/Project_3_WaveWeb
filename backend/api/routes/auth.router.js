const router = require("express").Router()

const { 
   signUp, 
   logIn
} = require("../controllers/auth.controller")

router
    .post("/client/signup", signUp)
    .post("/client/login", logIn)
    .post("/developer/login", logIn)

module.exports = router