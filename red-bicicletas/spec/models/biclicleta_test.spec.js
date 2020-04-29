let Bicicleta = require('../../models/bicicleta')

beforeEach(() => Bicicleta.allBicis = [])

describe('Bicicletas.allBicis', () => {
    it('comienza vacio', () => {
        expect(Bicicleta.allBicis.length).toBe(0)
    })
});

describe('Bicicletas.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0)

        let a = new Bicicleta(1, 'rojo', 'urbana', [4.9, -74.4])
        Bicicleta.add(a)

        expect(Bicicleta.allBicis.length).toBe(1)
        expect(Bicicleta.allBicis[0]).toBe(a)
    })
});

describe('Bicicletas.findBy', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        let a = new Bicicleta(1, 'rojo', 'urbana', [4.9, -74.4])
        let b = new Bicicleta(2, 'verde', 'montaña', [4.4, -75.8])

        Bicicleta.add(a)
        Bicicleta.add(b)

        let targetBici = Bicicleta.findById(1)
        expect(targetBici.id).toBe(a.id)
        expect(targetBici.color).toBe(a.color)
        expect(targetBici.modelo).toBe(a.modelo)
    })
});

describe('Bicicletas.removeById', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0)

        let a = new Bicicleta(1, 'rojo', 'urbana', [4.9, -74.4])
        let b = new Bicicleta(2, 'verde', 'montaña', [4.4, -75.8])

        Bicicleta.add(a)
        Bicicleta.add(b)

        expect(Bicicleta.allBicis.length).toBe(2)
        Bicicleta.removeById(2)
        expect(Bicicleta.allBicis.length).toBe(1)
    })
});