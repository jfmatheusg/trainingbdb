const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Usuario = require('../models/usuario')

passport.use(new LocalStrategy(
    (email, password, done) => {
        Usuario.findOne({ email: email }, (err, usuario) => {
            if (err) return done(err)
            if (!usuario) return done(null, false, { message: 'email o password es incorrecto' })
            if (!usuario.validPassword(password)) return done(null, false, { message: 'email o password es incorrecto' })
            return done(null, usuario)
        })
    }
))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    Usuario.findById(id, (err, usuario) => {
        cb(err, usuario)
    })
})

module.exports = passport