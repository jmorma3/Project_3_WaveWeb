const Agenda = require("../models/agenda.model")
const Project = require("../models/project.model")

require('dotenv').config()

const getAllMeetings = async (req, res) => {
    try {
        const meetings = await Agenda.findAll({
            where: req.query
        })
        if (meetings) {
            return res.status(200).json(meetings)
        } else {
            return res.status(404).send("No agendas found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneMeeting = async (req, res) => {
    try {
        const meeting = await Agenda.findByPk(req.params.meetingId, {
        })

        if (meeting) {
            return res.status(200).json(meeting)
        } else {
            return res.status(404).send("Meeting not found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOwnMeetings = async (req, res) => {
    try {
        let meetings = []
        if (res.locals.user.role === "dev") {
            meetings = await Agenda.findAll({
                where: {
                    devId: res.locals.user.id
                },
                attributes: ["id", "meeting_date", 'meeting_time', 'projectId', "clientId", "devId"],
            })
        } else if (res.locals.user.role === "client") {
            meetings = await Agenda.findAll({
                where: {
                    clientId: res.locals.user.id
                },
                attributes: ["id", "meeting_date", 'meeting_time', 'projectId',"clientId", "devId"],
            })
        }

        if (meetings) {
            const message = `Hi ${res.locals.user.first_name}! These are your next meetings:`
            return res.status(200).json({ message, meetings })
        } else {
            return res.status(404).send('Meetings not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneOwnMeeting = async (req, res) => {
    try {
        let meeting;

        if (res.locals.user.role === "dev") {
            meeting = await Agenda.findOne({
                where: {
                    id: req.params.meetingId,
                    devId: res.locals.user.id,
                },
                attributes: ["id", "meeting_date", 'meeting_time', 'projectId', "clientId"],
            });
        } else if (res.locals.user.role === "client") {
            meeting = await Agenda.findOne({
                where: {
                    id: req.params.meetingId,
                    clientId: res.locals.user.id,
                },
                attributes: ["id", "meeting_date", 'meeting_time', 'projectId', "devId"],
            });
        }

        if (meeting) {
            const message = `Hi ${res.locals.user.first_name}! This is your next neeting:`;
            return res.status(200).json({ message, meeting });
        } else {
            return res.status(404).send('Meeting not found or not associated with the user');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createMeeting = async (req, res) => {
    try {
        const { meeting_date, meeting_time, projectId, clientId, devId } = req.body

        const meeting = await Agenda.create({
            meeting_date: meeting_date,
            meeting_time: meeting_time,
            projectId: projectId,
            clientId: clientId,
            devId: devId
        })

        return res.status(200).json({ message: 'Meeting created', meeting: meeting })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createOwnMeeting = async (req, res) => {
    try {
        if (res.locals.user.role === "dev") {
            const { meeting_date, meeting_time, projectId, clientId, devId } = req.body

            // Verifica si el proyecto está asociado al dev que está autenticado
            const isProjectAssociated = await Project.findOne({
                where: {
                    id: req.params.projectId,
                    devId: res.locals.user.id
                }
            });

            if (isProjectAssociated) {
                const meeting = await Agenda.create({
                    meeting_date: meeting_date,
                    meeting_time: meeting_time,
                    projectId: projectId,
                    clientId: clientId,
                    devId: devId
                });

                return res.status(200).json({ message: 'Meeting created', meeting: meeting });
            } else {
                return res.status(403).send('You are not authorized to create a meeting for this project');
            }
        } else {
            return res.status(403).send('You are not authorized to create a meeting');
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const updateMeeting = async (req, res) => {
    try {
        const [meeting] = await Agenda.update({
            meeting_date: req.body.meeting_date,
            meeting_time: req.body.meeting_time,
            projectId: req.body.projectId,
            clientId: req.body.clientId,
            devId: req.body.devId

        }, {
            where: {
                id: req.params.meetingId
            }
        })

        if (meeting) {
            return res.status(200).json({ message: 'Meeting updated' })
        } else {
            return res.status(404).send('Meeting not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateOwnMeeting = async (req, res) => {
    try {
        if (res.locals.user.role !== "client") {
            const meeting = await Agenda.findOne({
                where: {
                    id: req.params.meetingId,
                    devId: res.locals.user.id
                }
            })

            if (meeting) {
                await Agenda.update(req.body, {
                    where: {
                        id: req.params.meetingId,
                        devId: res.locals.user.id
                    }
                })
                return res.status(200).json({ message: 'Meeting updated' })
            } else {
                return res.status(404).send('Meeting not found')
            }
        } else {
            return res.status(404).send('You are not authorized to update this meeting');
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Agenda.destroy({
            where: {
                id: req.params.meetingId
            }
        })

        if (meeting) {
            return res.status(200).json({ message: 'Meeting deleted' })
        } else {
            return res.status(404).send('Meeting not found')
        }

    } catch (error) {
        return res.status(500).send(error.message)

    }
}

const deleteOwnMeeting = async (req, res) => {
    try {
        if (res.locals.user.role !== "client") {
            const meeting = await Agenda.findOne({
                where: {
                    id: req.params.meetingId,
                    devId: res.locals.user.id
                }
            })

            if (meeting) {
                await Agenda.destroy({
                    where: {
                        id: req.params.meetingId,
                        devId: res.locals.user.id
                    }
                })
                return res.status(200).json({ message: 'Meeting deleted' })
            } else {
                return res.status(404).send('Meeting not found')
            }
        } else {
            return res.status(404).send('You are not authorized to delete this meeting');
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
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
}