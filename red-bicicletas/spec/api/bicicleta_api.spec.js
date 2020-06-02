let Bicicleta = require('../../models/bicicleta')
let request = require('request')
let server = require('../../bin/www')
let mongoose = require('mongoose')

let base_url = 'http://localhost:3000/api/bicicletas'

describe('Bicicletas API', () => {
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

    describe('GET BICICLETAS /', () => {
        it('STATUS 200', (done) => {

            request.get(base_url, (err, response, body) => {
                let result = JSON.parse(body)
                expect(response.statusCode).toBe(200)
                expect(result.bicicletas.length).toBe(0)
                done()

            })

        })
    })

    describe('POST BICICLETAS /create', () => {
        it('STATUS 200', (done) => {
            let headers = { 'content-type': 'application/json' }
            let aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": 4.9, "lng": -74.4 }'

            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, (err, response, body) => {
                let bici = JSON.parse(body).bicla
                expect(response.statusCode).toBe(200)
                expect(bici.color).toBe('rojo')
                done()

            })

        })
    })

    describe('UPDATE BICICLETAS /update', () => {
        it('STATUS 200', (done) => {
            let a = new Bicicleta({ code: 1, color: 'rojo', modelo: 'urbana' })
            Bicicleta.add(a, (err, newBici) => {
                let headers = { 'content-type': 'application/json' }
                let aBici = '{ "id": 1, "color": "verde", "modelo": "rural", "lat": 4.9, "lng": -74.4 }'

                expect(newBici.color).toBe('rojo')

                request.put({
                    headers: headers,
                    url: base_url + '/update',
                    body: aBici
                }, (err, response, body) => {
                    let updatedBici = JSON.parse(body)
                    expect(response.statusCode).toBe(200)
                    expect(updatedBici.bicla.color).toBe('verde')
                    done()

                })
            })



        })
    })

    describe('DELETE BICICLETAS /delete', () => {
        it('STATUS 200', (done) => {

            let headers = { 'content-type': 'application/json' }
            let aBici3 = '{ "id": 1, "color": "verde", "modelo": "urbana", "lat": 4.9, "lng": -74.4 }'

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

                            request.delete({
                                headers: headers,
                                url: base_url + '/delete',
                                body: aBici3
                            }, (err, response, body) => {

                                expect(response.statusCode).toBe(204)
                                Bicicleta.allBicis((err, bicis) => {
                                    expect(bicis.length).toBe(1)
                                })
                                done()

                            })
                        })
                    })
                })
            })
        })
    })
});