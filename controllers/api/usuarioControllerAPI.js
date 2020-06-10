var Usuario = require('../../models/usuario')

exports.usuarios_list = (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        res.status(200).json({
            usuarios: usuarios
        })
    })
}

exports.usarios_create = (req, res) => {
    var usuario = new Usuario({ nombre: req.body.nombre, email: req.body.email, password: req.body.password })
    usuario.save((err) => {
        if (err) return res.status(500).json(err)
        res.status(200).json(usuario)
    })
}

exports.usuario_reservar = (req, res) => {
    Usuario.findById(req.body.id, (err, usuario) => {
        console.log(usuario)
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, (err) => {
            console.log('reserva!!!')
            res.status(200).send()
        })
    })
}