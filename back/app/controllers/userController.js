const User = require('../models/user');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const nodemailer = require("nodemailer");
require('dotenv').config();


const sendSignUpEmail = async (clientEmail, clientName) => {

    let transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,//uses port 465 if secure is true.
        secure: true,
        auth: { user: process.env.mailUser, pass: process.env.mailPass },
        // auth: { user: 'contact@theodorebing.com', pass: '6A,tJY/XYe4RYbw' },

    });
    let email = await transporter.sendMail({
        from: '"the link app" <contact@theodorebing.com>', // sender address
        to: clientEmail, // list of recipients
        subject: "Welcome to the link!", // Subject line
        text: 'Hello '+clientName+' and welcome to the link! You are now registered and able to use the app.', // plain text body
        html: '<b>Hello '+clientName+' and welcome to the link! You are now registered and able to use the app.</b>', // html body
    });
}

const sendChangeEmail = async (previousClientEmail, clientName, clientEmail) => {

    let transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,//uses port 465 if secure is true.
        secure: true,
        auth: { user: process.env.mailUser, pass: process.env.mailPass },
        // auth: { user: 'contact@theodorebing.com', pass: '6A,tJY/XYe4RYbw' },

    });
    let email = await transporter.sendMail({
        from: '"the link app" <contact@theodorebing.com>', // sender address
        to: previousClientEmail, // list of recipients
        subject: "Your email address on the link!", // Subject line
        text: 'Hello '+clientName+'! Your email address as been changed on the link app and is now '+clientEmail+'.', // plain text body
        html: '<b>Hello '+clientName+'! Your email address as been changed on the link app and is now '+clientEmail+'.</b>', // html body
    });
    let email2 = await transporter.sendMail({
        from: '"the link app" <contact@theodorebing.com>', // sender address
        to: clientEmail, // list of recipients
        subject: "Your email address on the link!", // Subject line
        text: 'Hello '+clientName+'! Your email address as been changed on the link app and is now '+clientEmail+'. Previous email address '+previousClientEmail+' is not used anymore', // plain text body
        html: '<b>Hello '+clientName+'! Your email address as been changed on the link app and is now '+clientEmail+'. Previous email address '+previousClientEmail+' is not used anymore</b>', // html body
    });
}

const sendChangePassword = async (clientEmail, clientName) => {

    let transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,//uses port 465 if secure is true.
        secure: true,
        auth: { user: process.env.mailUser, pass: process.env.mailPass },
        // auth: { user: 'contact@theodorebing.com', pass: '6A,tJY/XYe4RYbw' },

    });
    let email = await transporter.sendMail({
        from: '"the link app" <contact@theodorebing.com>', // sender address
        to: clientEmail, // list of recipients
        subject: "the link - password", // Subject line
        text: 'Hello '+clientName+'! Your password has been changed.', // plain text body
        html: '<b>Hello '+clientName+'! Your password has been changed.</b>', // html body
    });
}

const userController = {

    subscribe : async (request, response, next) => {

        const theUserData = request.body;
        const passwordRegEx = /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W+)(?!.*[iIoO])\S{6,12}$/;

        // email validation 
        const isValidEmail = emailValidator.validate(theUserData.email);

        if (!theUserData.password || !theUserData.email || !theUserData.name) {
            response
                .status(401)
                .json({"error":"you must complete all the fields of this form to subscribe"});
            return;
        }

        if (theUserData.password.length <6 ) {
            response
                .status(401)
                .json({"error":"you must type a password with at least 6 charachters"});
            return;
        }


        if (theUserData.password.match(passwordRegEx)) {
            console.log('ok')
        } else {
            console.log('not ok')
            response
                .status(401)
                .json({"error":`your password is not strong enough (at least 6 characters, and maximum 12, with 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character)`});
            return;
        }

        if (!isValidEmail) {
            response
                .status(401)
                .json({"error":"invalid email"});
            return;
        };     

        try {

            // check user not already in base
            const userExists = await User.findAll({
                where : {email: theUserData.email}
            });

            if (userExists[0]) {
                // throw new Error('user already exists');
                response
                .status(401)
                .json({"error":"you can't use this email address"});
                return;
            }

            // create a hashed password
            const saltRounds = 10;
            theUserData.password = await new Promise((resolve, reject) => {
                bcrypt.hash(theUserData.password, saltRounds, function(error, hash) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(hash)
                    }
                });
            });

            // save user in relationnal PG database
            await User.create(theUserData);
            sendSignUpEmail(theUserData.email, theUserData.name);
            response.json(theUserData);

        } catch (error) {
            next(error);
        }

    },

    openSession : async (request, response, next) => {
        const searchedUser = request.body;
        
        // check email & password have been filled
        if (!searchedUser.email || !searchedUser.password) {
            response
                .status(400)
                .json({"error":"missing connexion information"});
            return;
        };

        try {
            let user = await User.findOne({
                where: {email: searchedUser.email}
            });
            if (user) {  
                user = user.dataValues;
                if (user.id) {
                    // compare passwords
                    const match = await bcrypt.compare(searchedUser.password, user.password)
                        if (match) {
                            request.session.userid = user.id
                            response.json(user);    
                        } else {
                            response
                                .status(404)
                                .json({"error":"invalid connexion information"})
                        }
                } else {
                    response
                        .status(404)
                        .json({"error":"invalid connexion information"})
                }
            } else {
                    response
                        .status(404)
                        .json({"error":"invalid connexion information"})
            }

        } catch (error) {
            next(error);
        }
    },

    getUserInfo : async (request, response, next) => {
        console.log('request.session.id getuserinfo', request.session.id)
        try {
            const user = await User.findAll({
                where : {id : request.session.userid}
            });
            if (user[0]) {
                response.json(user[0]);
            } else {
                response
                    .status(404)
                    .json({"error":"user is not connected"})
            }
        } catch (error) {
            next(error);
        }
    },

    logout : (request, response) => {
        request.session.userid = null;
        request.session.id = null;
        user = null;
        response.json({"status":"déconnecté"});
    },

    deleteUser : async (request, response, next) => {
        try {
            const user = await User.findAll({
                where : {id : request.session.userid}
            });
            console.log('user', user)
            const userDatas = user[0].dataValues;
            if (userDatas.id===undefined) {
                next();
            } else {
                await User.destroy({
                    where : {id : request.session.userid}
                });
                response
                    .status(200)
                    .json({"information":"user deleted"}); 
            };
        } catch (error) {
            next(error);
        }
    },

    updateUser : async (request, response, next) => {
 
        const patchUser = request.body;
        console.log('patchUser', patchUser)
        // if update email: validate it 
        if (patchUser.email) {
            const isValidEmail = emailValidator.validate(patchUser.email);
            if (!isValidEmail) {
                response
                    .status(401)
                    .json({"error":"invalid email"});
                return;
            };
        };

        // if update password: bcrypt
        if (patchUser.password) {

            const passwordRegEx = /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W+)(?!.*[iIoO])\S{6,12}$/;
            if (patchUser.password.match(passwordRegEx)) {
                console.log('ok')
            } else {
                response
                    .status(401)
                    .json({"error":`your password is not strong enough (at least 6 characters, and maximum 12, with 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character)`});
                return;
            }

            // create a hashed password
            const saltRounds = 10;
            patchUser.password = await new Promise((resolve, reject) => {
                bcrypt.hash(patchUser.password, saltRounds, function(error, hash) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(hash)
                    }
                });
            });
        }

        try {
            const sessionUser = await User.findAll({
                where : {id : request.session.userid}
            });
            const sessionUserDatas = sessionUser[0].dataValues;
            const previousEmail = sessionUserDatas.email;
            console.log('sessionUser[0].dataValues.id', sessionUser[0].dataValues.id)
            if (sessionUserDatas.id===undefined) {
                console.log('id undefined')
                next();
            } else {

                // compare original user & modified user, and build a user to save
                for (const property in patchUser) {
                    console.log('property', property)
                    if (typeof sessionUserDatas[property] !== 'undefined') {
                        sessionUserDatas[property] = patchUser[property];
                    }
                };
                // const newUser = new User(sessionUserDatas);
                
                await User.update(sessionUserDatas, {where : {id : request.session.userid}}); 
                response.json(sessionUserDatas);
                if (patchUser.email) {
                    sendChangeEmail(previousEmail, sessionUserDatas.name, patchUser.email)
                }
                if (patchUser.password) {
                    sendChangePassword(sessionUserDatas.email, sessionUserDatas.name)
                }
            };
        } catch (error) {
            console.log('catch error')
            next(error);
        }
    },
}

module.exports = userController;