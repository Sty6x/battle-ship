import { PubSub } from 'pubsub-js'

export class Players {
  constructor(ship) {
    this.shipDock = []
    this.ship = ship
    this.shipArr = [7, 6, 5, 4, 3, 2]
  }
  createShipDock() {
    for (let i = 0; i < this.shipArr.length; i++) {
      this.shipDock.push(new this.ship(this.shipArr[i]))
    }
    console.log(this.shipDock)
    PubSub.publish('sendDock', this.shipArr)
    return this.shipDock
  }
  //removeShip should subsribe to isSunk
  removeShip(shipData) {
    let shipIndex = this.shipDock.indexOf(shipData)
    let spliced = this.shipDock.splice(shipIndex, 1)
    const sunkenShip = spliced.pop()
    return sunkenShip
  }
}

export class Ai extends Players {
  constructor(ship) {
    super(ship)
    this.shipDock = []
  }
  async placeShip(gridContainer) {
    let grids = Array.from(gridContainer.children)
    for (let i = 0; i < this.shipDock.length; i++) {
      let { preceedingE } = await this.checkGrid(this.shipDock[i], gridContainer)
      for (let j = 0; j < this.shipDock[i].cellArr.length; j++) {
        let ndxPos = grids.indexOf(preceedingE[j])
        grids[ndxPos].appendChild(this.shipDock[i].cellArr[j])
      }
    }
    return gridContainer
  }

  async checkGrid(ship, gridcontainer) {
    let numOfGrids = gridcontainer.children.length
    let prE = []
    let randomTarget = Math.floor(Math.random() * numOfGrids)
    let max = numOfGrids - randomTarget
    if (ship.cellArr.length > max) {
      randomTarget = Math.floor(Math.random() * numOfGrids)
    }
    for (let i = 0; i < ship.cellArr.length; i++) {
      if (gridcontainer.children[randomTarget + i].classList.contains('vacant') &&
        gridcontainer.children[randomTarget + i].classList.contains('vacant') !== undefined) {

        prE.push(gridcontainer.children[randomTarget + i])
        prE[i].classList.replace('vacant', 'occupied')
      }
      else if (gridcontainer.children[randomTarget + i] == undefined ||
        (!gridcontainer.children[randomTarget + i].classList.contains('vacant')) ||
        gridcontainer.children[randomTarget + i].classList.contains('ship-cell')) {
        return this.checkGrid(ship, gridcontainer)

      }
    }

    return { preceedingE: prE }
  }

  async attack() {
    let playerGrid = document.getElementById('player-grid-container')
    let grids = Array.from(playerGrid.children)
    let randomTarget = Math.floor(Math.random() * grids.length)
    return playerGrid.children[randomTarget]
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
        return this.cellArr[i]
      }
    }
    return 'not a cell or type of class ship'
  }
  isSunk(hit) {
    if (hit == this.cellArr.length) {
      PubSub.publish('shipSunk', this)
      return true
    }
    return false
  }
  changeClass(cell) {
    cell.classList.replace('ship-cell', 'destroyed-cell')
    return cell.className
  }
}

