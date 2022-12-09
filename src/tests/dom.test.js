import { Display } from '../dom.js'
import {Players, Ships} from '../entities.js'

describe('should place players ships inside each child node of the ship-dock class',()=>{
document.body.innerHTML =
  `<div id='ship-dock-container'> 
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
      <div class='dock'></div>
    </div>`
test('Insert ships cell arr into each div ship dock',()=>{
    let shipDocks = document.querySelectorAll('.dock') 
    let display = new Display()
    let player = new Players(Ships)
    expect(display.shipToDock(player.shipDock,shipDocks)[0].children.length).toEqual(6) 
    expect(display.shipToDock(player.shipDock,shipDocks)[1].children.length).toEqual(5) 
    expect(display.shipToDock(player.shipDock,shipDocks)[2].children.length).toEqual(4) 
    expect(display.shipToDock(player.shipDock,shipDocks)[3].children.length).toEqual(3) 
    expect(display.shipToDock(player.shipDock,shipDocks)[4].children.length).toEqual(2) 
    expect(display.shipToDock(player.shipDock,shipDocks)[5].children.length).toEqual(2) 
  })
})



describe('Creating Board with passed in gridx and gridy', () => {
  let display = new Display();
  test('gameBoard should be 100', () => {
    expect(display.createBoard(10, 10).length).toBe(100)
  })
  test('gameBoard should be 50', () => {
    expect(display.createBoard(5, 10).length).toBe(50)
  })
  test('gameBoard should be 25', () => {
    expect(display.createBoard(5, 5).length).toBe(25)
  })
  test('displays 100 divs of class grid', () => {
    let gridArr =display.createBoard(10, 10)
    document.body.innerHTML =
      `<div class='grid-container'></div>`

    let displayGrid = (arr) => {
      let gridContainer = document.querySelector('.grid-container')
      for (let i = 0; i < arr.length; i++) {
        gridContainer.appendChild(arr[i])
      }
      return gridContainer
    }
    expect(displayGrid(gridArr).children.length).toEqual(100)
  })
})

