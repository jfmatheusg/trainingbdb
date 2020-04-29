let Bicicleta = require('../../models/bicicleta')
let request = require('request')
let server = require('../../bin/www')

describe('Bicicletas API', () => {

    describe('GET BICICLETAS /', () => {
        it('STATUS 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0)

            let a = new Bicicleta(1, 'rojo', 'urbana', [4.9, -74.4])
            Bicicleta.add(a)

            request.get('http://localhost:3000/api/bicicletas', (err, response, body) => {

                expect(response.statusCode).toBe(200)

            })

        })
    })

    describe('POST BICICLETAS /create', () => {
        it('STATUS 200', (done) => {
            let headers = { 'content-type': 'application/json' }
            let aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": 4.9, "lng": -74.4 }'

            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, (err, response, body) => {

                expect(response.statusCode).toBe(200)
                expect(Bicicleta.findById(10).color).toBe('rojo')
                done()

            })

        })
    })

    describe('UPDATE BICICLETAS /update', () => {
        it('STATUS 200', (done) => {
            let a = new Bicicleta(10, 'rojo', 'urbana', [4.9, -74.4])
            Bicicleta.add(a)

            let headers = { 'content-type': 'application/json' }
            let aBici = '{ "id": 10, "color": "verde", "modelo": "urbana", "lat": 4.9, "lng": -74.4 }'

            expect(Bicicleta.findById(10).color).toBe('rojo')

            request.put({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/update',
                body: aBici
            }, (err, response, body) => {

                expect(response.statusCode).toBe(200)
                expect(Bicicleta.findById(10).color).toBe('verde')
                done()

            })

        })
    })

    describe('DELETE BICICLETAS /delete', () => {
        it('STATUS 200', (done) => {
            let a = new Bicicleta(10, 'rojo', 'urbana', [4.9, -74.4])
            Bicicleta.add(a)

            let headers = { 'content-type': 'application/json' }
            let aBici = '{ "id": 10, "color": "verde", "modelo": "urbana", "lat": 4.9, "lng": -74.4 }'

            expect(Bicicleta.allBicis.length).toBe(1)

            request.delete({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/delete',
                body: aBici
            }, (err, response, body) => {

                expect(response.statusCode).toBe(204)
                expect(Bicicleta.allBicis.length).toBe(0)
                done()

            })

        })
    })
});