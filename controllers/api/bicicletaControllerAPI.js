let Bicicleta = require('../../models/bicicleta')

exports.bicicleta_list = (req, res) => {
    Bicicleta.allBicis((err, bicis) => {
        res.status(200).json({ bicicletas: bicis })
    })
}


exports.bicicleta_create = (req, res) => {
    let bici =
        new Bicicleta({
            code: req.body.id,
            color: req.body.color,
            modelo: req.body.modelo,
            ubicacion: [req.body.lat, req.body.lng]
        })


    Bicicleta.add(bici, (err, newBici) => {
        res.status(200).json({ bicla: newBici })
    })


}

exports.bicicleta_delete = (req, res) => {
    Bicicleta.removeByCode(req.body.id, (err, result) => {
        res.status(204).send()
    })


}

exports.bicicleta_update = (req, res) => {
    Bicicleta.findByCode(req.body.id, (err, bici) => {
        console.log(bici)
        bici.code = req.body.id
        bici.color = req.body.color
        bici.modelo = req.body.modelo
        bici.ubicacion = [req.body.lat, req.body.lng]
        bici.save()
        console.log(bici)
        res.status(200).send({ bicla: bici });
    })


}