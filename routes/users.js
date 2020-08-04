var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var users = require('../models').users;

// Source: https://dev.to/darshanbib/user-management-for-node-js-mysql-using-sequelize-and-passportjs-44kj

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async function(username, password, done) {
        var user = await users.findOne(
            { where: {
                username: username
            }
        });
        if (user == null) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        if (!user.isActive()) {
            return done(null, false, { message: 'User not yet activated. Contact the administrator.' });
        }
        return done(null, user);
    }
));

//renders register view
router.get('/register', function(req, res, next) {
    res.render('register', { title: "Sign Up" });
});

// handles register POST called from register javascript
router.post('/register', async function(req, res, next) {
    var seed = users.generateSeed();
    var password = users.encryptPassword(seed, req.body.password);

    if (!users.isValidPassword(req.body.password)) {
        return res.json({status: 'error', message: 'Password must be 5 or more characters.'});
    }
    if (!users.isValidUsername(req.body.username)) {
        return res.json({status: 'error', message: 'Username must be 5 or more characters, and should contains only letters, numbers, "-" or "_".'});
    }

    try {
        var user = await users.create({
            username: req.body.username,
            role: "inactive",
            password: password,
            seed: seed
        });
    } catch (err) {
        return res.json({status: 'error', message: 'Username already exists.'});
    }

    if (user) {
        res.json({status: 'ok'});
    } else {
        res.json({status: 'error', message: 'Unexplained error. Retry.'})
    }
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: "Sign In" });
});
  
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.json({status: 'error', message: info.message});
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({status: 'ok'});
        });
    })(req, res, next);
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

