const router = require("express").Router()

const { 
    getAllUsers,
    getOneUser,
    getOwnProfile,
    createUser,
    updateUser, 
    updateOwnProfile, 
    updateOwnPassword, 
    deleteUser, 
    deleteOwnProfile
} = require("../controllers/user.controller")

router
    .get("/", getAllUsers)
    .get("/:userId", getOneUser)
    .get("/profile", getOwnProfile)
    .post("/", createUser)
    .put("/:userId", updateUser)
    .put("/profile", updateOwnProfile)
    .put("/profile/password", updateOwnPassword)
    .delete("/:userId", deleteUser)
    .delete("/profile", deleteOwnProfile)

module.exports = router