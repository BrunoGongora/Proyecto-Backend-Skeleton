const {loginUser } = require('./auth.controller');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const loggin = (req, res) => {
    const {email, password } = req.body;

    if (email && password) {
        loginUser(email, password)
        .then(response => {
            if (response) {
                const token = jwt.sign({
                    id: response.id,
                    email: response.email,
                    role: response.role
                }, jwtSecret)
                res.status(200).json({
                    message: 'Credenciales correctas',
                    token
                })
            }else {
                res.status(400).json({message: 'Credenciales Invalidas'})
            }
        })
        .catch(error => {   
            res.status(400).json({message: error.message})
        })
    }else {
        return res.status(400).json({message: 'Falta informaciom'})
    }
};

module.exports = {
    loggin
}