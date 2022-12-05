import {Players} from '../entities.js'

test('instantiates 6 ships',()=>{
  class Ships {
    constructor(cells){
      this.id = cells
      this.isShip = true;
    }
  }
  let p1 =  new Players(Ships)
  expect(p1.shipDock).toEqual([{id:6, isShip:true},{id:5,isShip:true}])
})
