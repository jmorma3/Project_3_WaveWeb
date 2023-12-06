const router = require("express").Router()

const { checkAdmin } = require("../middlewares/index")

const {
    getAllMeetings,
    getOneMeeting,
    getOwnMeetings,
    getOneOwnMeeting,
    createMeeting,
    updateMeeting,
    updateOwnMeeting,
    deleteMeeting,
    deleteOwnMeeting
} = require("../controllers/agenda.controller")

router
    .get("/myAgenda", getOwnMeetings)
    .get("/", checkAdmin, getAllMeetings)
    .get("/:meetingId", checkAdmin, getOneMeeting)
    .get("/myAgenda/:meetingId", getOneOwnMeeting)
    .post("/", checkAdmin, createMeeting)
    //Pendiente añadir ".post" para el controlador "createOwnMeeting"
    .put("/:meetingId", checkAdmin, updateMeeting)
    .put("/myAgenda/:meetingId", updateOwnMeeting) //OJO: Añadir middleware para que sólo DEV pueda actualizar su AGENDA. 
    .delete("/:meetingId", checkAdmin, deleteMeeting)
    .delete("/myAgenda/:meetingId", deleteOwnMeeting)

module.exports = router