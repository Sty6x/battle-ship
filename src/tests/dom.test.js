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
