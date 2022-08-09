const reset_password = require('../models/reset_password');
const user = require('../models/user');
const mailer = require('../config/nodemailer');

exports.forgot = async (mail) => {
    let User = await user.findOne({ email: mail });
    let password = await reset_password.findOne({ user: User });

    let htmlString = mailer.renderTemplate({ token: password }, '/forgot_mailer.ejs');

    mailer.transporter.sendMail({
        from: 'vaibhav20458@gmail.com',
        to: mail,
        subject: 'Password Reset link',
        html: htmlString,
    }, (err, info) => {
        if (err) {
            console.log("Error while sending rest password mail", err);
            return;
        }

        return;
    });
};