const router = require("express").Router()

const { checkAdmin } = require("../middlewares/index")

const {
    getAllProjects,
    getOneProject,
    getOwnProjects,
    getOneOwnProject,
    createProject,
    createOneOwnProject,
    updateProject,
    updateOwnProject,
    deleteProject,
    deleteOwnProject
} = require("../controllers/project.controller")

router
    .get("/myProjects", getOwnProjects)
    .get("/myProjects/:projectId", getOneOwnProject)
    .get("/", checkAdmin, getAllProjects)
    .get("/:projectId", checkAdmin, getOneProject)
    .post("/myProjects", createOneOwnProject)
    .post("/", checkAdmin, createProject)  
    .put("/myProjects/:projectId", updateOwnProject) 
    .put("/:projectId", checkAdmin, updateProject)
    .delete("/:projectId", checkAdmin, deleteProject)
    .delete("/myProjects/:projectId", deleteOwnProject)

module.exports = router