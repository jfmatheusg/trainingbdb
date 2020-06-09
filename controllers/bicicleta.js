let Bicicleta = require('../models/bicicleta')

exports.bicicleta_list = (req, res) => Bicicleta.find({}, (err, bicis) => {
    res.render('bicicletas/index', { bicis: bicis })
})


exports.bicicleta_create_get = (req, res) => res.render('bicicletas/create')

exports.bicicleta_create_post = (req, res) => {
    Bicicleta.create({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    }, (err, nuevaBici) => {
        if (err) {
            res.render('bicicletas/create', { errors: err.message, bici: new Bicicleta() })
        } else {
            console.log(nuevaBici)
            res.redirect('/bicicletas')
        }
    })

}

exports.bicicleta_delete_post = (req, res) => {

    Bicicleta.findOneAndDelete({ code: req.body.code }, (err) => {
        if (err) next(err)
        else res.redirect('/bicicletas')
    })

}

exports.bicicleta_update_get = (req, res) => {
    Bicicleta.findOne({ code: req.params.code }, (err, bici) => {
        res.render('bicicletas/update', { bici })
    })

}

exports.bicicleta_update_post = (req, res) => {
    let update_values = {
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    }

    Bicicleta.findOneAndUpdate({ code: req.params.code }, update_values, (err, bici) => {
        if (err) {
            console.log(err)
            res.render('bicicletas/update', { errors: err.message, bici: new Bicicleta(update_values) })
        } else {
            res.redirect('/bicicletas')
        }
    })

}