const Project = require("../models/project.model")
const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require('dotenv').config()

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: req.query,
            // attributes: {
            //     exclude: ["price"]
            // }
        })
        if (projects) {
            return res.status(200).json(projects)
        } else {
            return res.status(404).send("No projects found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.projectId, {
            // attributes: {
            //     exclude: ["price"]
            // }
        })

        if (project) {
            return res.status(200).json(project)
        } else {
            return res.status(404).send("Project not found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOwnProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: {
                userId: res.locals.user.id
            },
            attributes: ['project_name', 'project_type', "price", "progress_status", "plus_prototype"],
            include: {
                model: User,
                attributes: ['first_name', 'last_name']
            }
        })

        if (projects) {
            const message = `These are your projects:`
            return res.status(200).json({ message, projects })
        } else {
            return res.status(404).send('Project not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneOwnProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.projectId,{
            where: {
                userId: res.locals.user.id
            },
            attributes: ['project_name', 'project_type', "price", "progress_status", "plus_prototype"],
            include: {
                model: User,
                attributes: ['first_name', 'last_name']
            }
        })

        if (project) {
            const message = `This is your projects:`
            return res.status(200).json({ message, project })
        } else {
            return res.status(404).send('Project not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createProject = async (req, res) => {
    try {
        const { project_name, project_type, price, progress_status, plus_prototype, userId } = req.body

        const project = await Project.create({
            project_name: project_name,
            project_type: project_type,
            price: price,
            progress_status: progress_status,
            plus_prototype: plus_prototype,
            userId: userId
        })

        return res.status(200).json({ message: 'Project created', project: project })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateProject = async (req, res) => {
    try {
        const [project] = await Project.update({
            project_name: req.body.project_name,
            project_type: req.body.project_type,
            price: req.body.price,
            progress_status: req.body.progress_status,
            plus_prototype: req.body.plus_prototype,
            userId: req.body.userId

        }, {
            where: {
                id: req.params.projectId
            }
        })

        if (project) {
            return res.status(200).json({ message: 'Project updated' })
        } else {
            return res.status(404).send('Project not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateOwnProject = async (req, res) => {
    try {
        const project = await Project.findOne({
            where: {
                userId: res.locals.user.id
            }
        })

        if (project) {
            await Project.update(req.body, {
                where: {
                    id: req.params.projectId
                }
            })
            return res.status(200).json({ message: 'Project updated' })
        }else {
            return res.status(404).send('Project not found')
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const deleteProject = async (req, res) => {
    try {
        const project = await Project.destroy({
            where: {
                id: req.params.projectId
            }
        })

        if (project) {
            return res.status(200).json({ message: 'Project deleted' })
        } else {
            return res.status(404).send('Project not found')
        }

    } catch (error) {
        return res.status(500).send(error.message)

    }
}

const deleteOwnProject = async (req, res) => {
    try {
        const project = await Project.findOne({
            where: {
                userId: res.locals.user.id
            }
        })

        if (project) {
            await Project.destroy( {
                where: {
                    id: req.params.projectId
                }
            })
            return res.status(200).json({ message: 'Project deleted' })
        }else {
            return res.status(404).send('Project not found')
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllProjects,
    getOneProject,
    getOwnProjects,
    getOneOwnProject,
    createProject,
    updateProject,
    updateOwnProject,
    deleteProject,
    deleteOwnProject
}