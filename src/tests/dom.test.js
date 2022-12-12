import { Display } from '../dom.js'
import { Players, Ships } from '../entities.js'
import { GameBoard } from '../game-board.js'

describe('should place players ships inside each child node of the ship-dock class', () => {
  document.body.innerHTML =
    `<div id='ship-dock-container'> 
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
    </div>`
  test('Insert ships cell arr into each div ship dock', () => {
    let shipDocks = document.querySelectorAll('.dock')
    let display = new Display()
    let player = new Players(Ships)
    expect(display.shipToDock(player.shipDock, shipDocks)[0].children.length).toEqual(6)
    expect(display.shipToDock(player.shipDock, shipDocks)[1].children.length).toEqual(5)
    expect(display.shipToDock(player.shipDock, shipDocks)[2].children.length).toEqual(4)
    expect(display.shipToDock(player.shipDock, shipDocks)[3].children.length).toEqual(3)
    expect(display.shipToDock(player.shipDock, shipDocks)[4].children.length).toEqual(2)
    expect(display.shipToDock(player.shipDock, shipDocks)[5].children.length).toEqual(2)
  })
})

describe('Should display the grid that was created by the gameboard', () => {
  let gb = new GameBoard();
  let dp = new Display();
  test('grid container should contain all the grids', () => {
    let grids = gb.createBoard(10, 10)
    document.body.innerHTML =
      `<div id='grid-container'></div>`
    expect(dp.displayGrid(grids).children.length).toEqual(100)
  })

  test('grid container should contain 50 the grids', () => {
    let grids = gb.createBoard(5, 10)
    document.body.innerHTML =
      `<div id='grid-container'></div>`
    expect(dp.displayGrid(grids).children.length).toEqual(50)
  })

  test('grid container should contain 25 the grids', () => {
    let grids = gb.createBoard(5, 5)
    document.body.innerHTML =
      `<div id='grid-container'></div>`
    expect(dp.displayGrid(grids).children.length).toEqual(25)
  })
})


describe('Dropping the ships to a target', () => {
  let gb = new GameBoard()
  let dp = new Display()
  let player = new Players(Ships)

  test('Should Add the dock to the first cell of the grid and its preceeding cells', () => {
    document.body.innerHTML =
      `<div id='grid-container'></div>
   <div id='ship-dock-container'> 
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
    </div>`

    let docks = document.querySelectorAll('.dock')
    dp.shipToDock(player.shipDock, docks)
    dp.displayGrid(gb.createBoard(10, 10))
    let dock = docks[0]
    let target = document.getElementById('grid-container').children[0]
    let gridContainer = document.getElementById('grid-container')
    expect(dp.dropShip(target, dock)).toBe(6)
  })

})
