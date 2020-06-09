let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }
    }
})

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
    let newBicicle = new this();
    newBicicle.code = code;
    newBicicle.color = color;
    newBicicle.modelo = modelo;
    newBicicle.ubicacion = ubicacion;
    return newBicicle;
}

bicicletaSchema.methods.toString = () => 'code: ' + this.code + ' | color: ' + this.color

bicicletaSchema.statics.allBicis = function(cb) { this.find({}, cb)  }

bicicletaSchema.statics.add = function(aBici, cb) { this.create(aBici, cb) }

bicicletaSchema.statics.findByCode = function(aCode, cb) { this.findOne({ code: aCode }, cb) }

bicicletaSchema.statics.removeByCode = function(aCode, cb) { this.deleteOne({ code: aCode }, cb) }

module.exports = mongoose.model('Bicicleta', bicicletaSchema)