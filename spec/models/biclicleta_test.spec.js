let mongoose = require('mongoose')
let Bicicleta = require('../../models/bicicleta')

describe('Testing Bicicletas', () => {

    beforeEach((done) => {
        var mongoDB = 'mongodb://localhost/testdb'
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'MongoDB connection error: '))
        db.once('open', () => {
            console.log('DB connection succesful!')
            done()
        })
    })

    afterEach((done) => {
        Bicicleta.deleteMany({}, (err, success) => {
            if (err) console.log(err)
            done()
        })
    })

    describe('Bicicleta.createInstance', () => {
        it('Crea una instancia de bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [4.9, -74.4])
            expect(bici.code).toBe(1)
            expect(bici.modelo).toBe("urbana")
            expect(bici.color).toBe("verde")
            expect(bici.ubicacion[0]).toEqual(4.9)
            expect(bici.ubicacion[1]).toEqual(-74.4)
        })
    })

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0)
                done();
            })
        })
    })

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" })
            Bicicleta.add(aBici, (err, newBici) => {
                if (err) console.log(err)
                Bicicleta.allBicis((err, bicis) => {
                    expect(bicis.length).toBe(1)
                    expect(bicis[0].code).toBe(aBici.code)
                    done();
                })
            })
        })
    })

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0)

                var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" })
                Bicicleta.add(aBici, (err, newBici) => {
                    if (err) console.log(err)

                    var aBici2 = new Bicicleta({ code: 2, color: "morado", modelo: "otra" })
                    Bicicleta.add(aBici2, (err, newBici) => {
                        if (err) console.log(err)
                        Bicicleta.findByCode(1, (err, targetBici) => {
                            expect(targetBici.code).toBe(aBici.code)
                            expect(targetBici.color).toBe(aBici.color)
                            expect(targetBici.modelo).toBe(aBici.modelo)
                            done();
                        })
                    })
                })
            })
        })
    })

    describe('Bicicleta.deleteByCode', () => {
        it('agrega solo una bici', (done) => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0)

                var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" })
                Bicicleta.add(aBici, (err, newBici) => {
                    if (err) console.log(err)

                    var aBici2 = new Bicicleta({ code: 2, color: "morado", modelo: "otra" })
                    Bicicleta.add(aBici2, (err, newBici) => {
                        if (err) console.log(err)

                        Bicicleta.allBicis((err, bicis) => {
                            expect(bicis.length).toBe(2)
                            Bicicleta.removeByCode(1, (err, result) => {
                                Bicicleta.allBicis((err, bicis) => {
                                    expect(bicis.length).toBe(1)
                                    done();
                                })
                            })
                        })
                    })
                })
            })
        })
    })

})