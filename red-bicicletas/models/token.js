var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tokenSchema = new Schema({
    fechaCreacion: Date,
    token: String,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
})

module.exports = mongoose.model('Token', tokenSchema)
