let Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id
    this.color = color
    this.modelo = modelo
    this.ubicacion = ubicacion
}

Bicicleta.prototype.toString = () => 'id: ' + this.id + '| color: ' + this.color

//En memoria se guardan las bicis
Bicicleta.allBicis = []

//agregar Bici
Bicicleta.add = (aBici) => Bicicleta.allBicis.push(aBici)

//Encontrar bici por id
Bicicleta.findById = (aBiciId) => {
    let aBici = Bicicleta.allBicis.find(x => x.id == aBiciId)
    if (aBici)
        return aBici
    else
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`)
}

//Elimnar Biclas
Bicicleta.removeById = (aBiciId) => {

    //se asegura que el objeto exista
    Bicicleta.findById(aBiciId)

    for (let i = 0; i < Bicicleta.allBicis.length; i++)
        if (Bicicleta.allBicis[i].id == aBiciId) {
            Bicicleta.allBicis.splice(i, 1)
            break
        }

}

//Precargado de bicis
let a = new Bicicleta(1, 'rojo', 'urbana', [4.9, -74.4])
let b = new Bicicleta(2, 'verde', 'urbana', [4.4, -75.8])

Bicicleta.add(a)
Bicicleta.add(b)
module.exports = Bicicleta