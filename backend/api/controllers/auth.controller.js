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
        const userFirstName = user.dataValues.first_name
        const userLastName = user.dataValues.last_name
        const userEmail = user.dataValues.email
        

        return res.status(200).json({
            message: 'User created',
            token: token,
            userId: userId,
            userRole: userRole, 
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail
           
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
            const userFirstName = user.first_name
            const userLastName = user.last_name
            const userEmail = user.email
            
            return res.status(200).json({ token, userId, userRole, userFirstName, userLastName, userEmail })
        } else {
            return res.status(404).json('Error: Email or Password incorrect')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { signUp, logIn }