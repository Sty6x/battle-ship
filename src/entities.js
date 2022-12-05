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
    this.hit = 0;
    this.#createShip(cells)
  }
  
  #createShip(cells) {
    for (let i = 0; i < cells; i++) {
      let cell = document.createElement('div')
      cell.setAttribute('class','ship-cell')
      cell.setAttribute('id',`ship-${cells}-${i}`)
      this.cellArr.push(cell)
    }
  }
  isHit(rCell) {
    console.log(this.cellArr[0].id)
    for (let i = 0; i < this.cellArr.length; i++) {
      if (rCell.id == this.cellArr[i].id) {
        this.hit++;
        return this.cellArr[i]
      }
    }
    return 'not a cell or type of class ship'
  }
}
