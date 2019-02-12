const Project = require('../models/Project');
const User = require('../models/User');
const Team = require('../models/Team');
 
module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    searchTeams: async (req, res) => {
        try{
            const query = req.query.text.toLowerCase();

            let teams = await Team.find({}).populate('projects').populate('users');

            teams = teams.filter(a => a.name.toLowerCase().includes(query));

            res.render('team/all', {teams})
        }
        catch(e){
            console.log(e);
        }
        
    },
    searchProjects: async (req, res) => {
        try{
            const query = req.query.text.toLowerCase();

            let projects = await Project.find({}).populate('team');

            
            projects = projects.filter(a => a.name.toLowerCase().includes(query));

            projects.forEach(p => {
                if(!p.team){
                    p.noTeam = true;
                }
            })


            res.render('project/all', {projects})
        }
        catch(e){
            console.log(e);
        }
        
    }
};