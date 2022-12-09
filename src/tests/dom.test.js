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
    let shipDocksList = Array.from(shipDocks)
    let display = new Display()
    let player = new Players(Ships)
   expect(display.shipToDock(player.shipDock,shipDocks)).toEqual() 
  })

})
