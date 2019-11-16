const router = require('express').Router()
const passport = require('passport')
const User = require('../db/models/users')

// Google authentication and login (GET /auth/google)
// This is a redirect to Google when the user clicks the "Login with Google" button
router.get('/', passport.authenticate('google', { scope: 'email' }))

// Once our user "signs the contract" with Google, google will make a request to this callback that we've configured with them.
router.get('/verify', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login'
}));

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/verify'
}

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(
  token,
  refreshToken,
  profile,
  done
) {
  const googleId = profile.id
  const name = profile.displayName
  const email = profile.emails[0].value

  User.findOne({ where: { googleId: googleId } })
    .then(function(user) {
      if (!user) {
        return User.create({ name, email, googleId }).then(function(user) {
          done(null, user)
        })
      } else {
        done(null, user)
      }
    })
    .catch(done)
})

// register our strategy with passport
passport.use(strategy)

module.exports = router
