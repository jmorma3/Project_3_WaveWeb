const router = require("express").Router()

const { checkAdmin } = require("../middlewares/index")

const {
    getAllMeetings,
    getOneMeeting,
    getOwnMeetings,
    getOneOwnMeeting,
    createMeeting,
    createOwnMeeting,
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
    .post("/myAgenda/:projectId", createOwnMeeting)
    .put("/:meetingId", checkAdmin, updateMeeting)
    .put("/myAgenda/:meetingId", updateOwnMeeting)
    .delete("/:meetingId", checkAdmin, deleteMeeting)
    .delete("/myAgenda/:meetingId", deleteOwnMeeting)

module.exports = router