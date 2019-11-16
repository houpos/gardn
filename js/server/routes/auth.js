const router = require('express').Router()
const passport = require('passport')
const User = require('../db/models/users')

router.use('/google', require('./oauth'))

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      let noUserError = new Error('No User Found')
      noUserError.status = 401
      throw noUserError
    } else if (!user.correctPassword(req.body.password)) {
      let badPWDError = new Error('Incorrect Password')
      badPWDError.status = 401
      throw badPWDError
    } else if (user.correctPassword(req.body.password)) {
      // for security, we're not going to send the password
      const userObj = {
        id: user.id,
        email: user.email,
        imageUrl: user.imageUrl,
        googleId: user.googleId
      }
      req.login(user, err => (err ? next(err) : res.json(userObj)))
    }
  } catch (error) {
    next(error)
  }
})

//a method that our app can use to fetch the logged-in user on our session.
router.get('/me', async (req, res, next) => {
  try {
    //get session, find id
    const userId = req.session.passport.user

    if (!userId) {
      res.sendStatus(401)
    } else {
      //query database for user
      const user = await User.findByPk(userId)
      if (!user) {
        res.sendStatus(401)
      } else {
        res.json(req.user)
      }
    }
  } catch (error) {
    next(error)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.status(204).redirect('/')
})

router.post('/signup', async (req, res, next) => {
  try {
    // first, use find. If email is found, send error that a user with that email
    // has already signed up. If no user found, create
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      // for security, we're going to directly pull what we need from req.body
      const userObj = {
        email: req.body.email,
        password: req.body.password,
        imageUrl: req.body.imageUrl,
        googleId: req.body.googleId
      }
      const addUser = await User.create(userObj)

      // let's not send password, create a new object
      const createdUserObj = {
        id: addUser.id,
        email: addUser.email,
        imageUrl: addUser.imageUrl,
        googleId: addUser.googleId
      }
      req.login(createdUserObj, function(err) {
        if (err) {
          return next(err)
        }
        return res.json(createdUserObj)
      })
    } else {
      let alreadySignedUp = new Error('User with this Email Arleady in System')
      alreadySignedUp.status = 409
      throw alreadySignedUp
    }
  } catch (error) {
    next(error)
  }
})

passport.serializeUser((user, done) => {
  try {
    console.log('in serializeuser', user.id)
    done(null, user.id)
  } catch (err) {
    done(err)
  }
})

passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser', id)
  try {
    const user = await User.findByPk(id)
    if (!user) {
      done(new Error('User Not Found'))
    } else {
      done(null, user)
    }
  } catch (error) {
    done(error)
  }
})

module.exports = router
