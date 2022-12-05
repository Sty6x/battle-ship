export class Players{
 constructor(ship){
    this.shipDock = []
    this.ship = ship
    this._playerShips = [6,5]
    this.#createShips(this.ship,this._playerShips)
  }
  #createShips(ship, playerShips){
    for(let i = 0; i < playerShips.length;i++){
      this.shipDock.push(new ship(playerShips[i]))
    }
    return this.shipDock
  }
}
