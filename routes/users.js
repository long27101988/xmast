var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../config')

router.post('/login', function(req, res) {
  req.checkBody("email").isEmail();
  req.checkBody('password').notEmpty();

  const errors = req.validationErrors();
  if(errors) {
    res.status(400).json({
      error: {
        message: errors[0].msg
      }
    })
  }

  passport.authenticate('local', {session: false}, function(err, user, info) {
    if (err || !user) {
      return res.status(400).json({
        error: {
          message: 'This user does not exists'
        }
      });
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
            res.send(err);
        }

        const userData = {
          _id: user._id,
          name: user.name,
          email: user.email
        }

        const token = jwt.sign(userData, config.keySecure);
        return res.json({...userData, token});
    })
  })(req, res)
});

router.post('/register', function(req, res) {

})



module.exports = router;
