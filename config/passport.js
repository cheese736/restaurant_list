const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')
const User = require('../models/user')
const bycrypt = require('bcryptjs')

module.exports = app => {
  // 初始化
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email})
      .then(user => {
        if (!user) {
          return done(null, false, {message: 'Invalid email '})
        }
        return bycrypt.compare(password, user.password).then(isMatch => { 
          if (!isMatch) { return done(null, false, {message: 'Incorrect email or password'}) }
          return done(null, user)
         }) 
      })
      .catch(err => done(err, false))

  // facebook 登入策略
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
    },
    (accessToken, refreshToken, profile, done) => {
    const {name, email} = profile._json
    User.findOne({ email })
      .then(user => {
      if (user) return done(null, user)
      
      const randomPassword = Math.random().toString(36).slice(-8)

      bycrypt.genSalt(10)
      .then(salt => bycrypt.hash(randomPassword,salt))
      .then(hash => {
      User.create({
        name,
        email,
        password: hash
        })
      })
      .then(user => done(null, user))
      .catch(err => done(err, false))
      })
    }
  ))
  
    // 序列化與反序列化
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
      User.findById(id)
        .lean()
        .then(user => done(null, user))
        .catch(err => done(err, null))
    })
  }))
}