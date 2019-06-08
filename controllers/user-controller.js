const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Team = require('../models/Team')


module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                imageUrl: reqUser.imageUrl,
                roles: []
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },
    profileGet: async (req, res) => {
        try{
            let userId = req.user._id;
            let user = await User.findById(userId)
            .populate({path: 'teams', populate:{path: 'projects'}});
            res.render('users/profile', user)
        }
        catch(e){

        }
    },
    leaveTeam: async (req, res) => {
        try{
            let teamId = req.params.id;
            let userId = req.user._id;

            let team = await Team.findById(teamId);
            let user = await User.findById(userId);

            let userIndex = team.users.indexOf(userId);

            if(userIndex > -1){
                team.users.splice(userIndex, 1);
            }

            let teamIndex = user.teams.indexOf(teamId);
            
            if(teamIndex > -1){
                user.teams.splice(teamIndex, 1);
            }

            await team.save();
            await user.save();

            res.redirect('/')

        }
        catch(e){
            console.log(e);
        }
    },
};