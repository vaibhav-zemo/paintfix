const user = require('../models/user')
const passport = require('passport');
const reset_password = require('../models/reset_password');
const crypto = require('crypto');
const path = require('path');
const forgot_mailer = require('../mailers/forgot');


module.exports.sign_in = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('sign_in', {
        title: 'Sign In'
    })
}

module.exports.sign_up = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('sign_up', {
        title: 'Sign Up'
    })
}

module.exports.forgot = function (req, res) {
    return res.render('forgot', {
        title: 'Forgot Password Page',
    });
}

module.exports.reset = async function (req, res) {

    let User = await user.findOne({ email: req.body.email });
    if (!User) {
        return res.redirect('back');
    }

    let rest = await reset_password.create({
        accesstoken: crypto.randomBytes(20).toString('hex'),
        user: User.id,
        isvalid: true,
    });


    forgot_mailer.forgot(req.body.email);
    return res.render('wait', {
        title: 'Wait',
    });
}

module.exports.wait = function (req, res) {
    return res.render('wait', {
        title: 'WAIT'
    })
}

module.exports.change = async function (req, res) {
    let reset = await reset_password.findOne({ accesstoken: req.params.id });
    if (reset.isvalid) {
        reset.isvalid = false;
        reset.save();
        return res.render('change', {
            title: "Change Your Password",
            token: req.params.id
        });
    }
    return res.send('<h1> Link is Expired!! </h1>');
}

module.exports.change_password = async function (req, res) {

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    let reset = await reset_password.findOne({ accesstoken: req.params.id });
    let resetPopulate = await reset.populate('user', 'email password');

    let User = await user.findOneAndUpdate({ email: resetPopulate.user.email });

    if (!User) {
        console.log("user not found");
        return res.redirect('back');
    }

    User.password = req.body.confirm_password;
    console.log("********user  change", User);
    User.save();
    return res.redirect('/');
}

module.exports.create_user = async function (req, res) {

    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        let users = await user.findOne({ email: req.body.email });

        if (!users) {
            user.create(req.body, function (err, data) {
                return res.redirect('/');
            });
        }
        else {
            return res.redirect('/user/sign_in');
        }

    } catch (err) {
        console.log("Error", err);
        return;
    }
}

module.exports.createSession = function (req, res) {
    req.flash('success', 'Successfully Logged In');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.flash('success', 'Successfully Logged Out');
    req.logout(function (err) {
        if (err) {
            console.log("Error in req logout during signout", err);
        }
        return res.redirect('/');
    });
}
