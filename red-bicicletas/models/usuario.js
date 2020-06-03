var mongoose = require('mongoose')
var Reserva = require('./reserva')
var Token = require('./token')
var Schema = mongoose.Schema

const mailer = require('../mailer/mailer')

const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const crypto = require('crypto')

const saltRounds = 10

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor ingrese un email válido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    verificado: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario' })

usuarioSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds)
    }
    next();
})

usuarioSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password)
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta })
    console.log(reserva)
    reserva.save(cb)
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
    console.log(this._id)
    const token = new Token({ _userId: this._id, token: crypto.randomBytes(16).toString('hex') })
    const email_destination = this.email
    token.save((err) => {
        if (err) return console.log(err.message)

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Verificación de cuenta',
            text: 'Holi. Haga click en este link: \n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '.\n'
        }

        mailer.sendMail(mailOptions, (err) => {
            if (err) return console.log(err.message)

            console.log('A verification email has been sent to ' + email_destination)
        })
    })
}

module.exports = mongoose.model('Usuario', usuarioSchema)
