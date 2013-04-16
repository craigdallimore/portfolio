var model = require('./Model'),

    project = model.project(),
    book = model.book(),
    network = model.network(),
    profile = model.profile(),
    user = model.user(),
    tech = model.tech();

exports.API = {
    Book:           require('./Controller/API/Book').Book(book),
    Network:        require('./Controller/API/Network').Network(network),
    Tech:           require('./Controller/API/Tech').Tech(tech),
    Profile:        require('./Controller/API/Profile').Profile(profile),
    Project:        require('./Controller/API/Project').Project(project),
    User:           require('./Controller/API/User').User(user)
};

exports.Index =     require('./Controller/Index').Index;
exports.About =     require('./Controller/About').About({ book: book, network: network, profile: profile, tech: tech });
exports.Projects =  require('./Controller/Projects').Projects(project);
exports.Project =   require('./Controller/Project').Project(project);
exports.CMS =       require('./Controller/CMS').CMS(user);
exports.Login =     require('./Controller/Login').Login(user);
exports.Logout =    require('./Controller/Logout').Logout;
exports.Register =  require('./Controller/Register').Register(user);
