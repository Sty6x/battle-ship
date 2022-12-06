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

  test('Creates cells depending on the # that was passed in: 6', () => {
    let shipArray = 6
    let ship = new Ships(shipArray)
    expect(ship.cellArr.length).toEqual(6)
  })

  test('Creates cells depending on the # that was passed in: 3', () => {
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
    let cells = 6
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-6-4'></div>`
    let targetCell = document.querySelector('.ship-cell')
    let expectedCell = document.querySelector('.ship-cell')
    expectedCell.classList.replace('ship-cell', 'destroyed-cell')
    let ship = new Ships(cells)

    expect(ship.isHit(targetCell)).toEqual(expectedCell)
  })


  test('receives a cell of id-4-1', () => {
    let cells = 4
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-4-1'></div>`
    let targetCell = document.querySelector('.ship-cell')
    let expectedCell = document.querySelector('.ship-cell')
    expectedCell.classList.replace('ship-cell', 'destroyed-cell')
    let ship = new Ships(cells)

    expect(ship.isHit(targetCell)).toEqual(expectedCell)
  })


  test('receives a cell of id-2-0', () => {
    let cells = 2
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-2-0'></div>`
    let targetCell = document.querySelector('.ship-cell')
    let expectedCell = document.querySelector('.ship-cell')
    expectedCell.classList.replace('ship-cell', 'destroyed-cell')
    let ship = new Ships(cells)

    expect(ship.isHit(targetCell)).toEqual(expectedCell)
  })

})

describe('isHit receives nothing and returns nothing or if an id doesnt belong to any of the cell of the ship', () => {
  let cells = 6
  test('should return an error ', () => {
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-2-0'></div>`
    let targetCell = document.querySelector('.ship-cell')
    let ship = new Ships(cells)
    expect(ship.isHit(targetCell)).toEqual('not a cell or type of class ship')
  })


  test('should return an error ', () => {
    document.body.innerHTML =
      `<div class='ship-cell' id='ship-1-0'></div>`
    let targetCell = document.querySelector('.ship-cell')
    let ship = new Ships(cells)
    expect(ship.isHit(targetCell)).toEqual('not a cell or type of class ship')
  })
})


describe('increment hit property when isHit() is called', () => {
  let cells = 6
  document.body.innerHTML =
    `<div class='ship-cell' id='ship-6-0'></div>`
  let targetCell = document.querySelector('.ship-cell')

  test('hit should return 1', () => {
    let ship = new Ships(cells)
    ship.isHit(targetCell)
    expect(ship.hit).toBe(1)
  })

  test('hit should return 2', () => {
    let ship = new Ships(cells)
    ship.isHit(targetCell)
    ship.isHit(targetCell)
    expect(ship.hit).toBe(2)
  })

  test('hit should return 3', () => {
    let ship = new Ships(cells)
    ship.isHit(targetCell)
    ship.isHit(targetCell)
    ship.isHit(targetCell)
    expect(ship.hit).toBe(3)
  })
})

describe('Check isSunk if it returns the object', () => {

  test('should return true if hit is equal to the length of the shipCells array', () => {
    let hit = 6
    let cells = 6
    let ship = new Ships(cells)
    expect(ship.isSunk(hit)).toBeTruthy()
  })

  test('should return false if hit is NOT equal to the length of the shipCells array', () => {
    let hit = 3
    let cells = 6
    let ship = new Ships(cells)
    expect(ship.isSunk(hit)).toBeFalsy()
  })
})


describe('when hit is true then change the target cells class to destroyed-cell', () => {
  let cells = 6
  document.body.innerHTML =
    `<div class='ship-cell' id='ship-6-3'></div>`
  let targetCell = document.querySelector('.ship-cell')

  test('node should change class to destroyed cell', () => {
    let ship = new Ships(cells)
    ship.isHit(targetCell)
    expect(ship.changeClass(targetCell)).toEqual('destroyed-cell')
  })
})


describe('Removing ship from ship dock when isSunk is true and publishes the object"s "this"', () => {
  let shipArray = [6, 5, 4, 3, 2, 2]
  let p1 = new Players(Ships, shipArray)
  let ship2 = p1.shipDock[1] // should be [5]
  console.log(ship2)
  test.only('should remove the 2nd ship', () => {
    expect(p1.removeShip(ship2)).toEqual(ship2)})

  let ship1 = p1.shipDock[0]
  test('should remove the 1st ship', () => {
    expect(p1.removeShip(ship1)).toEqual(ship1)})

})
