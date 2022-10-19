const { getUserByEmail } = require("../users/user.controllers")
const { comparePassword } = require('../utils/crypto')

const loginUser = async(email, password) => {
    try {
        const user = await getUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        }
        return false
        
    } catch (error) {
        return false
    }
};

loginUser('gongorabruno@gmail.com', 'root')
    .then(response => console.log(response))
    .catch(err => console.log(err))

module.exports = {
    loginUser
}