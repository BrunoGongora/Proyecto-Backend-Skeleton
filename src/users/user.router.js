const router = require('express').Router();
const { authenticate } = require('passport');
const passport = require('passport')
const userServices = require('./user.services');
require('../midlewares/auth.middleware')(passport)



router.get('/', passport.authenticate('jwt', {session: false}), userServices.getAllUsers)


router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getMyUser)
    .patch(
        passport.authenticate('jwt', {session: false}),
        userServices.patchUser)
    .delete(
        passport.authenticate('jwt', {session: false}),
        userServices.deleteUser)

router.route('/:id')
.get(userServices.getUserById)
.patch(userServices.patchUser)
.delete(userServices.deleteUser)



module.exports = router