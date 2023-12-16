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
    .get("/profile", getOwnProfile)
    .get("/", checkAdmin, getAllUsers)
    .get("/:userId", /*checkAdmin,*/getOneUser)
    .post("/", checkAdmin, createUser)
    .put("/profile", updateOwnProfile)
    .put("/profile/password", updateOwnPassword)
    .put("/:userId", updateUser)
    .delete("/profile", deleteOwnProfile)
    .delete("/:userId", checkAdmin, deleteUser)

module.exports = router