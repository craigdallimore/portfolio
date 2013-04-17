exports.init = function(passport) {

    var model = require('./Model'),
        LocalStrategy = require('passport-local').Strategy,

        Project = model.project(),
        Book = model.book(),
        Network = model.network(),
        Profile = model.profile(),
        User = model.user(),
        Tech = model.tech();

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {

        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unknown user: ' + email }); }
            user.comparePassword(password, function(err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });

    }));

    return {
        API : {
            Book:           require('./Controller/API/Book').Book(Book),
            Tech:           require('./Controller/API/Tech').Tech(Tech),
            Network:        require('./Controller/API/Network').Network(Network),
            Profile:        require('./Controller/API/Profile').Profile(Profile),
            Project:        require('./Controller/API/Project').Project(Project),
            User:           require('./Controller/API/User').User(User)
        },
        Index :     require('./Controller/Index').Index,
        About :     require('./Controller/About').About({ book: Book, network: Network, profile: Profile, tech: Tech }),
        Projects :  require('./Controller/Projects').Projects(Project),
        Project :   require('./Controller/Project').Project(Project),
        CMS :       require('./Controller/CMS').CMS(User),
        Login :     require('./Controller/Login').Login(User, passport),
        Logout :    require('./Controller/Logout').Logout,
        Register :  require('./Controller/Register').Register(User, passport)

    };


};

