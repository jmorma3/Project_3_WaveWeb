const Project = require("../models/project.model")
const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: req.query,
            attributes: {
                exclude: ["password"]
            }
        })
        if (users) {
            return res.status(200).json(users)
        } else {
            return res.status(404).send("No useres found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            attributes: {
                exclude: ["password"]
            }
        })

        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send("User not found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOwnProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: res.locals.user.id
            },
            attributes: ['first_name', 'last_name', "email"],
            include: {
                model: Project,
                attributes: ['project_name', 'project_type', 'progress_status']
            }
        })

        if (user) {
            const message = `Hi ${user.first_name}!`
            return res.status(200).json({ message, user })
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, profile_type } = req.body

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password too short' })
        }

        const saltRounds = parseInt(process.env.SALTROUNDS)
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            profile_type: profile_type
        })

        return res.status(200).json({ message: 'User created', user: user })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const [user] = await User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.hashedPassword,
            profile_type: req.body.profile_type
        }, {
            where: {
                id: req.params.userId
            }
        })

        if (user) {
            return res.status(200).json({ message: 'User updated' })
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateOwnProfile = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: res.locals.user.id
            }
        })

        return res.status(200).json({ message: 'Profile updated' })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateOwnPassword = async (req, res) => {
    try {
        const newPassword = req.body.password;

        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password too short' });
        }

        // Generar un nuevo hash de contraseña con un nuevo salt
        const saltRounds = parseInt(process.env.SALTROUNDS);
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        // Actualizar la contraseña del usuario
        const userId = res.locals.user.id;
        const updatedUser = await User.update({
            password: hashedPassword
        }, {
            where: {
                id: userId
            }
        }
        );

        if (updatedUser[0] === 1) {
            return res.status(200).json({ message: 'Password changed' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.userId
            }
        })

        if (user) {
            return res.status(200).json({ message: 'User deleted' })
        } else {
            return res.status(404).send('User not found')
        }

    } catch (error) {
        return res.status(500).send(error.message)

    }
}

const deleteOwnProfile = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: res.locals.user.id
            }
        })
        
        return res.status(200).json({ message: 'Profile deleted' })

    } catch (error) {
        return res.status(500).send( error.message )
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    getOwnProfile,
    createUser,
    updateUser, 
    updateOwnProfile, 
    updateOwnPassword, 
    deleteUser, 
    deleteOwnProfile
}