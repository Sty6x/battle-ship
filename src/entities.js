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
  #removeShip(ship) {
    // if()
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
      cell.setAttribute('class', 'ship-cell')
      cell.setAttribute('id', `ship-${cells}-${i}`)
      this.cellArr.push(cell)
    }
  }
  isHit(rCell) {
    for (let i = 0; i < this.cellArr.length; i++) {
      if (rCell.id == this.cellArr[i].id) {
        this.hit++;
        this.changeClass(this.cellArr[i])
        this.isSunk(this.hit)
        // let isHit subscribe
        // the cell is modified and throws an error when tested
        return this.cellArr[i]
      }
    }
    return 'not a cell or type of class ship'
  }
  isSunk(hit) {
    if (hit == this.cellArr.length) {
      // change to return this instead of true
      return true
    }
    return false
  }
  changeClass(cell) {
    cell.classList.replace('ship-cell', 'destroyed-cell')
    return cell.className
  }
}
