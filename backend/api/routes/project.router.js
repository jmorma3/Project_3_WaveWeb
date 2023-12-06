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
    .get("/", checkAdmin, getAllProjects)
    .get("/:projectId", checkAdmin, getOneProject)
    .get("/myProjects", getOwnProjects)
    .get("/myProjects/:projectId", getOneOwnProject)
    .post("/", checkAdmin, createProject)  //OJO: pendiente añadir middleware para que sólo el ADMIN y Client puedan "Crear projects..."
    .put("/:projectId", checkAdmin, updateProject)
    .put("/myProjects/:projectId", updateOwnProject) //OJO: Añadir middleware para que sólo DEV pueda actualizar su project. 
    .delete("/:projectId", checkAdmin, deleteProject)
    .delete("/myProjects/:projectId", deleteOwnProject)

module.exports = router