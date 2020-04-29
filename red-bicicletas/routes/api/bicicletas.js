var express = require('express')
var router = express.Router()
var bicicletaAPIController = require('../../controllers/api/bicicletaControllerAPI')


router.get('/', bicicletaAPIController.bicicleta_list)
router.post('/create', bicicletaAPIController.bicicleta_create)
router.delete('/delete', bicicletaAPIController.bicicleta_delete)
router.put('/update', bicicletaAPIController.bicicleta_update)

module.exports = router