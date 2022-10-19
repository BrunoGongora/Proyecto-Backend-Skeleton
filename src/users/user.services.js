const { json } = require('sequelize');
const userControllers = require('./user.controllers')


const getAllUsers = (req, res) => {
    userControllers.getAllUsers()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
 }; 

const getUserById = (req, res) => {
    const id = req.params.id
    userControllers.getUserById(id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(404).json({message: err.message})
    })
};

const patchUser = (req, res) => {
    const id = req.params.id
    const {firstName, lastName, phone, birthday, gender, country} = req.body
    userControllers.updateUser(id, {firstName, lastName, phone, birthday, gender, country})
    .then(data => {
        if (data[0]) {
            res.status(200).json({message: `user with ID ${id}, edited succesfully`})
        }else {
            res.status(400).json({message: 'iNVALID iD'})
        }
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    userControllers.deleteUser(id)
    .then(data => {
        if (data) {
            res.status(204).json()
        }else{
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch(err => {
        res.status(400).json({messsage: err.message})
    })
};

const registerUser = (req, res) => {
    const { firstName, lastName, email, password, phone, birthday, gender, country } = req.body
    if (firstName && lastName && email && password && phone && birthday && gender && country) {
        userControllers.createUser({
            firstName, lastName, email, password, phone, birthday, gender, country
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            res.status(400).json({message: error.message})
        })
    }else {
        res.status(400).json({message: 'Todos los campos deben ser completatos', fields: {
            firstName: 'string',
            lastName: 'string',
            email: 'example@eexample.com',
            password: 'string',
            phone: '+575555555555',
            birthday: 'yyyy/mm/dd'
        }})
    }
}

const getMyUser = (req, res) => {
    const id = req.user.id

    userControllers.getUserById(id)
    .then(data => {
            res.status(200).json(data)
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}
 
const patchMyUser = (req, res) => {
    const id = req.user.id

    userControllers.getUserById(id)
    .then(data => {
            res.status(200).json(data)
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id

    userControllers.getUserById(id)
    .then(data => {
            res.status(200).json(data)
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}



module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser, 
    deleteUser,
    getMyUser,
    patchMyUser,
    deleteMyUser
}