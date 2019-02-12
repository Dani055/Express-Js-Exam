const Project = require('../models/Project');
const User = require('../models/User');
const Team = require('../models/Team');
 
module.exports = {
    createGet: (req, res) => {
        res.render('project/create');
    },
    createPost: async (req, res) => {
        try{
            let {name, description} = req.body

            await Project.create({
                name,
                description,
            });
    
            res.redirect('/')
        }
        catch(e){
            console.log(e)
        }   
    },
    distributeGetAdmin: async (req, res) => {
        try{
            let teams = await Team.find({});
            let projects = await Project.find({team: undefined});

            res.render('project/distribute', {teams, projects})
        }
        catch(e){
            console.log(e)
        }
    },
    distributePostAdmin: async (req, res) => {
        try{
            let {teamId, projectId} = req.body;
            
            let team = await Team.findById(teamId);
            let project = await Project.findById(projectId);
            
            team.projects.push(projectId);
            project.team = teamId;

            await team.save();
            await project.save();

            res.redirect('/')
        }
        catch(e){
            console.log(e)
        }
    },
    viewAllGet: async (req, res) => {
        try{
            let projects = await Project.find({})
            .populate('team');

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
    },
};