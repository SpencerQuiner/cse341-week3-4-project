const router = require('express').Router();
const passport = require('passport');

//Start GitHub login
router.get('/github',
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Redirect to GitHub for authentication'
    */
    passport.authenticate('github', { scope: ['user:email'] })
);

// Callback
router.get(
    '/github/callback',
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'GitHub OAuth callback'
    */
    passport.authenticate('github', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/');
    }
);

//Logout
router.get('/logout',
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Logout current user'
    */
    (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

//Current user
router.get('/me',
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Get current authenticated user'
    */
    (req, res) => {
    res.json(req.user || null);
});

module.exports = router;