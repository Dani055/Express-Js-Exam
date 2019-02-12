const Project = require('../models/Project');
const User = require('../models/User');
const Team = require('../models/Team');

module.exports = {
    createGet: (req, res) => {
        res.render('team/create');
    },
    createPost: async (req, res) => {
        try {
            let { name } = req.body

            await Team.create({
                name: name
            });

            res.redirect('/')
        }
        catch (e) {
            console.log(e)
        }
    },
    distributeGetAdmin: async (req, res) => {
        try {
            let users = await User.find({});
            let teams = await Team.find({});

            res.render('team/distribute', { users, teams })
        }
        catch (e) {
            console.log(e)
        }
    },
    distributePostAdmin: async (req, res) => {
        try {
            let { userId, teamId } = req.body;

            let user = await User.findById(userId);
            let team = await Team.findById(teamId);
            
            let arr = team.users.filter(u => u.toString() === userId.toString())

            if (arr.length === 0) {
                user.teams.push(teamId);
                team.users.push(userId);

                await team.save();
                await user.save();

                res.redirect('/')
            }
            else{
                res.locals.globalError = 'User is already in the team!'
                res.render('team/distribute')
            }


        }
        catch (e) {
            console.log(e)
        }
    },
    viewAllGet: async (req, res) => {
        try {
            let teams = await Team.find({})
                .populate('projects')
                .populate('users');

            res.render('team/all', { teams })
        }
        catch (e) {
            console.log(e);
        }
    },
};