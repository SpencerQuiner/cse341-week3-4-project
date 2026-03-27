const router = require('express').Router();
const passport = require('passport');

//Start GitHub login
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

// Callback
router.get(
    '/github/callback', passport.authenticate('github', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/');
    }
);

//Logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

//Current user
router.get('/me', (req, res) => {
    res.json(req.user || null);
});

module.exports = router;