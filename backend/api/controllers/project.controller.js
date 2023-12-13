const Project = require("../models/project.model")
const User = require("../models/user.model")
const Invoice = require("../models/invoice.model")


const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require('dotenv').config()

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: req.query
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
        let projects = []
        if (res.locals.user.role === "dev") {
            projects = await Project.findAll({
                where: {
                    devId: res.locals.user.id
                },
                attributes: ["id", 'project_name', 'project_type', "price", "progress_status", "plus_prototype", "clientId"],
            })
        } else if (res.locals.user.role === "client") {
            projects = await Project.findAll({
                where: {
                    clientId: res.locals.user.id
                },
                attributes: ["id", 'project_name', 'project_type', "price", "progress_status", "plus_prototype", "devId"],
            })
        }

        if (projects) {
            const message = `Hi ${res.locals.user.first_name}! These are your projects:`
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
        let project;

        if (res.locals.user.role === "dev") {
            project = await Project.findOne({
                where: {
                    id: req.params.projectId,
                    devId: res.locals.user.id,
                },
                attributes: ["id", "project_name", "project_type", "price", "progress_status", "plus_prototype", "clientId"],
            });
        } else if (res.locals.user.role === "client") {
            project = await Project.findOne({
                where: {
                    id: req.params.projectId,
                    clientId: res.locals.user.id,
                },
                attributes: ["id", "project_name", "project_type", "price", "progress_status", "plus_prototype", "devId"],
            });
        }

        if (project) {
            const message = `Hi ${res.locals.user.first_name}! This is your project:`;
            return res.status(200).json({ message, project });
        } else {
            return res.status(404).send('Project not found or not associated with the user');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const createProject = async (req, res) => {
    try {
        const { project_name, project_type, price, progress_status, plus_prototype, devId, clientId } = req.body

        const project = await Project.create({
            project_name: project_name,
            project_type: project_type,
            price: price,
            progress_status: progress_status,
            plus_prototype: plus_prototype,
            devId: devId,
            clientId: clientId
        })

        return res.status(200).json({ message: 'Project created', project: project })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createOneOwnProject = async (req,res)=>{
    try {
        if (res.locals.user.role !== "dev") {
            const { project_name, project_type, price, progress_status, plus_prototype, clientId, devId } = req.body;

            // Crear el proyecto
            const project = await Project.create({
                project_name: project_name,
                project_type: project_type,
                price: price,
                progress_status: progress_status,
                plus_prototype: plus_prototype,
                devId: devId,
                clientId: clientId,
            });

            // Crear la factura asociada al proyecto
            // const { id: projectId } = project; // Obtener el ID del proyecto creado
            // const { invoice_date, amount, payment_date, payment_method, payment_currency } = req.body;

            // const invoice = await Invoice.create({
            //     devId: null, // Puedes establecer estos valores según tus necesidades
            //     clientId: clientId,
            //     projectId: projectId,
            //     invoice_date: invoice_date,
            //     amount: amount,
            //     payment_date: payment_date,
            //     payment_method: payment_method,
            //     payment_currency: payment_currency
            // });

            return res.status(200).json({ message: 'Project and invoice created', project: project });
        } else {
            return res.status(404).send('You are not authorized to create a project');
        }
    } catch (error) {
        return res.status(500).send(error.message);
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
            devId: req.body.devId,
            clientId: req.body.clientId,

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
        if (res.locals.user.role !== "client") {
            const project = await Project.findOne({
                where: {
                    id: req.params.projectId,
                    devId: res.locals.user.id
                }
            })

            if (project) {
                await Project.update(req.body, {
                    where: {
                        id: req.params.projectId,
                        devId: res.locals.user.id
                    }
                })
                return res.status(200).json({ message: 'Project updated' })
            } else {
                return res.status(404).send('Project not found')
            }
        } else {
            return res.status(404).send('You are not authorized to update this project');
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
        if (res.locals.user.role !== "client") {
            const project = await Project.findOne({
                where: {
                    id: req.params.projectId,
                    devId: res.locals.user.id
                }
            })

            if (project) {
                await Project.destroy({
                    where: {
                        id: req.params.projectId,
                        devId: res.locals.user.id
                    }
                })
                return res.status(200).json({ message: 'Project deleted' })
            } else {
                return res.status(404).send('Project not found')
            }
        } else {
            return res.status(404).send('You are not authorized to delete this project');
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
    createOneOwnProject,
    updateProject,
    updateOwnProject,
    deleteProject,
    deleteOwnProject
}