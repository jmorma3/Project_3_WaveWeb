const router = require("express").Router()

const { checkAdmin } = require("../middlewares/index")

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
    .get("/", checkAdmin, getAllUsers)
    .get("/:userId", checkAdmin, getOneUser)
    .get("/profile", getOwnProfile)
    .post("/", checkAdmin, createUser)
    .put("/:userId", updateUser)
    .put("/profile", updateOwnProfile)
    .put("/profile/password", updateOwnPassword)
    .delete("/:userId", checkAdmin, deleteUser)
    .delete("/profile", deleteOwnProfile)

module.exports = router