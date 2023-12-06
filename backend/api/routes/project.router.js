const router = require("express").Router()

const { checkAdmin } = require("../middlewares/index")

const {
    getAllProjects,
    getOneProject,
    getOwnProjects,
    getOneOwnProject,
    createProject,
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
    .post("/", checkAdmin, createProject)  //OJO: pendiente añadir middleware para que sólo el ADMIN y Client puedan "Crear projects..."
    .put("/myProjects/:projectId", updateOwnProject) //OJO: Añadir middleware para que sólo DEV pueda actualizar su project. 
    .put("/:projectId", checkAdmin, updateProject)
    .delete("/:projectId", checkAdmin, deleteProject)
    .delete("/myProjects/:projectId", deleteOwnProject)

module.exports = router