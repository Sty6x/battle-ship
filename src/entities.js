export class Players {
  constructor(ship, shipArr) {
    this.shipDock = []
    this.ship = ship
    this.#createShipDock(this.ship, shipArr)
  }
  #createShipDock(ship, playerShips) {
    for (let i = 0; i < playerShips.length; i++) {
      this.shipDock.push(new ship(playerShips[i]))
    }
    return this.shipDock
  }
}

export class Ships {
  constructor(cells) {
    this.cellArr = []
    this.#createShip(cells)
    this.hit = 0;
  }
  
  #createShip(cells) {
    for (let i = 0; i < cells; i++) {
      let cell = document.createElement('div')
      this.cellArr.push(cell)
      this.cellArr[i].setAttribute('class','ship-cell')
      this.cellArr[i].setAttribute('id',`ship-${cells}-${i}`)
    }
  }
  isHit(rCell) {
    for (let i = 0; i < this.cellArr.length; i++) {
      if (rCell.id == this.cellArr[i].id) {
        this.hit++;
        return this.cellArr[i]
      }
    }
    return 'not a cell or type of class ship'
  }
}
