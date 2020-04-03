var express = require('express')
var router = express.Router()
var bicicletaAPIController = require('../../controllers/api/bicicletaControllerAPI')


router.get('/', bicicletaAPIController.bicicleta_list)
router.post('/', bicicletaAPIController.bicicleta_create)
router.delete('/', bicicletaAPIController.bicicleta_delete)

module.exports = router