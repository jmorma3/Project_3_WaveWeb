const Agenda = require("../models/agenda.model")
const User = require("../models/user.model")
const Project = require("../models/project.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require('dotenv').config()

const getAllMeetings = async (req, res) => {
    try {
        const meetings = await Agenda.findAll({
            where: req.query,
            // attributes: {
            //     exclude: ["price"]
            // }
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
            // attributes: {
            //     exclude: ["price"]
            // }
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
        const meetings = await Agenda.findAll({
            where: {
                userId: res.locals.user.id
            },
            attributes: ['meeting_date', 'meeting_time'],
            include: {
                model: User,
                attributes: ['first_name', 'last_name']
            },
            include: {
                model: Project,
                attributes: ['project_name']
            }
        })

        if (meetings) {
            const message = `Your next meetings:`
            return res.status(200).json({ message, meetings })
        } else {
            return res.status(404).send('Meeting not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneOwnMeeting = async (req, res) => {
    try {
        const meeting = await Agenda.findOne({
            where: {
                userId: res.locals.user.id,
                id: req.params.meetingId
            },
            attributes: ['meeting_date', 'meeting_time'],
            include: {
                model: User,
                attributes: ['first_name', 'last_name']
            },
            include: {
                model: Project,
                attributes: ['project_name']
            }
        })

        if (meeting) {
            const message = `Meeting info:`
            return res.status(200).json({ message, meeting })
        } else {
            return res.status(404).send('Meeting not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createMeeting = async (req, res) => {
    try {
        const { meeting_date, meeting_time, userId, projectId } = req.body

        const meeting = await Agenda.create({
            meeting_date: meeting_date,
            meeting_time: meeting_time,
            userId: userId,
            projectId: projectId
        })

        return res.status(200).json({ message: 'Meeting created', meeting: meeting })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//Pendiente revisar este controlador: ¿Cómo permito que sólo el DEV pueda añadir meetings nuevos a sus projects?
const createOwnMeeting = async (req, res) => {

}

const updateMeeting = async (req, res) => {
    try {
        const [meeting] = await Agenda.update({
            meeting_date: req.body.meeting_date,
            meeting_time: req.body.meeting_time,
            userId: req.body.userId,
            projectId: req.body.projectId

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
        const meeting = await Agenda.findOne({
            where: {
                userId: res.locals.user.id
            }
        })

        if (meeting) {
            await Agenda.update(req.body, {
                where: {
                    id: req.params.meetingId
                }
            })
            return res.status(200).json({ message: 'Meeting updated' })
        }else {
            return res.status(404).send('Meeting not found')
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
        const meeting = await Agenda.findOne({
            where: {
                userId: res.locals.user.id
            }
        })

        if (meeting) {
            await Agenda.destroy( {
                where: {
                    id: req.params.meetingId
                }
            })
            return res.status(200).json({ message: 'Meeting deleted' })
        }else {
            return res.status(404).send('Meeting not found')
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
    updateMeeting,
    updateOwnMeeting,
    deleteMeeting,
    deleteOwnMeeting
}