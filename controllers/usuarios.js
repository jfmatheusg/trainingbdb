let Usuario = require('../models/usuario')

module.exports = {
    list: (req, res, next) => {
        Usuario.find({}, (err, usuarios) => {
            res.render('usuarios/index', { usuarios: usuarios })
        })
    },
    update_get: (req, res, next) => {
        Usuario.findById(req.params.id, (err, usuario) => {
            res.render('usuarios/update', { errors: {}, usuario: usuario })
        })
    },
    update: (req, res, next) => {
        let update_values = { nombre: req.body.nombre }
        console.log(params.id)
        Usuario.findByIdAndUpdate(req.params.id, update_values, (err, usuario) => {
            if (err) {
                console.log(err)
                res.render('usuarios/update', { errors: err.message, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) })
            } else {
                res.redirect('/usuarios')
                return
            }
        })
    },
    create_get: (req, res, next) => {
        res.render('usuarios/create', { errors: {}, usuario: new Usuario() })
    },
    create: (req, res, next) => {

        if (req.body.password != req.body.confirm_password) {
            res.render('usuarios/create', { errors: { confirm_password: { message: 'No coinciden los passwords' } } })
            return
        }

        Usuario.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,

        }, (err, nuevoUsuario) => {

            if (err) {
                res.render('usuarios/create', { errors: err.message, usuario: new Usuario() })
            } else {
                console.log(nuevoUsuario)
                nuevoUsuario.enviar_email_bienvenida()
                res.redirect('/usuarios')
            }
        })
    },
    delete: (req, res, next) => {
        Usuario.findByIdAndDelete(req.body.id, (err) => {
            if (err) next(err)
            else res.redirect('/usuarios')
        })
    }

}