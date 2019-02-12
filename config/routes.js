const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', restrictedPages.isAuthed,controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    app.get('/profile',restrictedPages.isAuthed, controllers.user.profileGet);
    app.post('/team/leave/:id',restrictedPages.isAuthed, controllers.user.leaveTeam);
    app.get('/team/search',restrictedPages.isAuthed, controllers.home.searchTeams);
    app.get('/project/search',restrictedPages.isAuthed, controllers.home.searchProjects);


    app.get('/team/create',restrictedPages.hasRole('Admin'), controllers.team.createGet);
    app.post('/team/create', restrictedPages.hasRole('Admin'), controllers.team.createPost);

    app.get('/project/create',restrictedPages.hasRole('Admin'),  controllers.project.createGet);
    app.post('/project/create',restrictedPages.hasRole('Admin'),  controllers.project.createPost);

    app.get('/project/distribute',restrictedPages.hasRole('Admin'),  controllers.project.distributeGetAdmin);
    app.post('/project/distribute',restrictedPages.hasRole('Admin'),  controllers.project.distributePostAdmin);

    app.get('/team/distribute',restrictedPages.hasRole('Admin'),  controllers.team.distributeGetAdmin);
    app.post('/team/distribute',restrictedPages.hasRole('Admin'),  controllers.team.distributePostAdmin);

    app.get('/project/viewAll',restrictedPages.isAuthed, controllers.project.viewAllGet);
    app.get('/team/viewAll', restrictedPages.isAuthed, controllers.team.viewAllGet);

    
    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};