const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://cse341-week3-4-project.onrender.com/auth/github/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        let user = await User.findOne({ email});
        if (!user) {
            user = await User.create({
                firstName: profile.displayName?.split(' ')[0] || profile.username,
                lastName: profile.displayName?.split(' ')[1] || '',
                email: email
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
    
});