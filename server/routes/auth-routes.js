const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req,res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req,res) => {
    if (req.user !== null) {
        req.logout();
        res.send('logging out');
    }
  // handle with passport
});

// auth with our own Login
router.get('/local', (req, res) => {
  res.render('ourlogin');
});

// auth with our own signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect',
  passport.authenticate('google', {"failureRedirect": "/google"}),
  (req,res) => {
    //var name = res.user.firstName + " " + res.user.lastName;
      console.log(req.body.username);
      var name = "";
      res.send("<html><p>you reached the callback URI. </p><script>window.opener.loginSuccess(" + name + ");window.close()</script></html>");
  }
);

module.exports = router;
