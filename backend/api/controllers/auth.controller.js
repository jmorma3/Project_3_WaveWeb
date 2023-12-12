const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user.model")

require("dotenv").config()

const signUp = async (req, res) => {
    try {
        // Verificar que el role sea "client"
        if (req.body.role !== "client") {
            return res.status(400).json({ message: 'Invalid role. Only "client" role is allowed.' });
        }

        // Verificar la longitud de la contraseña
        if (req.body.password.length < 8) {
            return res.status(400).json({ message: 'Password too short' });
        }

        // Generar el hash de la contraseña
        const payload = { email: req.body.email }
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
        const encrypted = bcrypt.hashSync(req.body.password, salt);
        req.body.password = encrypted;

        // Crear el usuario
        const user = await User.create(req.body);

        // Generar el token
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
        const userId= user.dataValues.id
        const userRole =user.dataValues.role

        return res.status(200).json({
            message: 'User created',
            token: token,
            userId: userId,
            userRole: userRole
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const logIn = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) return res.status(404).send('Error: Email or Password incorrect')

        const comparePass = bcrypt.compareSync(req.body.password, user.password)

        if (comparePass) {
            const payload = { email: user.email, password: user.password }
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
            const userId = user.id
            const userRole = user.role
            return res.status(200).json({ token, userId, userRole })
        } else {
            return res.status(404).json('Error: Email or Password incorrect')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { signUp, logIn }