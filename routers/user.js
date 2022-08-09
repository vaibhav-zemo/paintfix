const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/sign_in', userController.sign_in);
router.get('/sign_up', userController.sign_up);

router.get('/forgot-password',userController.forgot);
router.post('/reset-password',userController.reset);
router.get('/change/:id',userController.change);
router.post('/change-password/:id',userController.change_password);

router.post('/create_user', userController.create_user);
router.get('/wait',userController.wait);

router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/user/sign_in' }
    ), userController.createSession);

router.get('/sign_out',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign_in'}),userController.createSession);



module.exports = router;