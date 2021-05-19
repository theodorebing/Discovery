const User = require('../models/user');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

const userController = {

    subscribe : async (request, response, next) => {

        const theUserData = request.body;
        console.log('request.body.email', request.body.email)
        // email validation 
        const isValidEmail = emailValidator.validate(theUserData.email);

        if (!isValidEmail) {
            response
                .status(401)
                .json({"error":"invalid email"});
            return;
        };        

        try {
            
            // check user not already in base
            const userExists = await User.findAll({
                where: {email: theUserData.email}
            });
            if (userExists.id) {
                throw new Error('user already exists');
            };

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

            // const newUser = new User(theUserData);

            // save user in relationnal PG database
            await User.create(theUserData);

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
            let user = await User.findAll({
                where: {email: searchedUser.email}
            });
            if (user[0]) {
                user = user[0].dataValues;
            }
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

        } catch (error) {
            next(error);
        }
    },

    getUserInfo : async (request, response, next) => {
        console.log('request.session.id getuserinfo', request.session.userid)
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
                where : {id : request.session.id}
            });
            if (user.id===undefined) {
                next();
            } else {
                await User.destroy({
                    where : {id : request.session.id}
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
                where : {id : request.session.id}
            });
            if (sessionUser.id===undefined) {
                next();
            } else {

                // compare original user & modified user, and build a user to save
                for (const property in patchUser) {
                    if (typeof sessionUser[property] !== 'undefined') {
                        sessionUser[property] = patchUser[property];
                    }
                };
                const newUser = new User(sessionUser);
                
                await User.update(newUser); 
                response.json(newUser); 
            };
        } catch (error) {
            next(error);
        }
    },
}

module.exports = userController;