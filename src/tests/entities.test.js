import { Players, Ships } from '../entities.js'

describe('Creating Ships when player object is instantiated', () => {

  test('instantiates 6 ships', () => {
    let shipArray = [6, 5, 4, 3, 2, 2]
    class Ships {
      constructor(cells) {
        this.id = cells
        this.isShip = true;
      }
    }
    let p1 = new Players(Ships, shipArray)
    expect(p1.shipDock).toEqual([{ id: 6, isShip: true }, { id: 5, isShip: true },
    { id: 4, isShip: true }, { id: 3, isShip: true },
    { id: 2, isShip: true }, { id: 2, isShip: true }
    ])
  })

  test('instantiates 3 ships', () => {
    let shipArray = [6, 5, 4]
    class Ships {
      constructor(cells) {
        this.id = cells
        this.isShip = true;
      }
    }
    let p1 = new Players(Ships, shipArray)
    expect(p1.shipDock).toEqual([{ id: 6, isShip: true }, { id: 5, isShip: true },
    { id: 4, isShip: true }])
  })

  test('instantiates 1 ships', () => {
    let shipArray = [6]
    class Ships {
      constructor(cells) {
        this.id = cells
        this.isShip = true;
      }
    }
    let p1 = new Players(Ships, shipArray)
    expect(p1.shipDock).toEqual([{ id: 6, isShip: true }])
  })
})

describe('Creating ship cells when ship object is instantiated', () => {

  test('Creates cells depending on the # that was passed in: 1', () => {
    let shipArray = 6
    let ship = new Ships(shipArray)
    expect(ship.cellArr.length).toEqual(6)
  })

  test('Creates cells depending on the # that was passed in: 1', () => {
    let shipArray = 3
    let ship = new Ships(shipArray)
    expect(ship.cellArr.length).toEqual(3)
  })

  test('Creates cells depending on the # that was passed in: 1', () => {
    let shipArray = 1
    let ship = new Ships(shipArray)
    expect(ship.cellArr.length).toEqual(1)
  })
})

describe('isHit receiving receiveAttack from game board that returns a cell that was hit', () => {

  test('receives a cell of id-6-4', () => {
    let cell = 6
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-6-4'></div>`
    let testCell = document.querySelector('.ship-cell')
    let ship = new Ships(cell)

    expect(ship.isHit(testCell)).toEqual(testCell)
  })


  test('receives a cell of id-4-1', () => {
    let cell = 4
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-4-1'></div>`
    let testCell = document.querySelector('.ship-cell')
    let ship = new Ships(cell)

    expect(ship.isHit(testCell)).toEqual(testCell)
  })


  test('receives a cell of id-2-0', () => {
    let cell = 2
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-2-0'></div>`
    let testCell = document.querySelector('.ship-cell')
    let ship = new Ships(cell)

    expect(ship.isHit(testCell)).toEqual(testCell)
  })

})

describe('isHit receives nothing and returns nothing or if an id doesnt belong to any of the cell of the ship', () => {
  let cell = 6
  test('should return an error ', () => {
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-2-0'></div>`
    let testCell = document.querySelector('.ship-cell')
    let ship = new Ships(cell)
    expect(ship.isHit(testCell)).toEqual('not a cell or type of class ship')
  })


  test('should return an error', () => {
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-1-0'></div>`
    let testCell = document.querySelector('.ship-cell')
    let ship = new Ships(cell)
    expect(ship.isHit(testCell)).toEqual('not a cell or type of class ship')
  })
})


describe('increment hit property when isHit() is called', () => {
  let cell = 6
  document.body.innerHTML =
    `<div class='ship-cell' id='ship-6-0'></div>`
  let testCell = document.querySelector('.ship-cell')

  test('hit should return 1', () => {
    let ship = new Ships(cell)
    ship.isHit(testCell)
    expect(ship.hit).toBe(1)
  })

  test('hit should return 2', () => {
    let ship = new Ships(cell)
    ship.isHit(testCell)
    ship.isHit(testCell)
    expect(ship.hit).toBe(2)
  })

  test('hit should return 3', () => {
    let ship = new Ships(cell)
    ship.isHit(testCell)
    ship.isHit(testCell)
    ship.isHit(testCell)
    expect(ship.hit).toBe(3)
  })
})

describe('Check isSunk if it returns the object and null if not', () => {
  let hit = 5
  let cell = 5
  let ship = new Ships(cell)
  test('should return true if hit is equal to the length of the shipCells array', () => {

    expect(ship.isSunk(hit)).toBeTruthy()
  })
})
