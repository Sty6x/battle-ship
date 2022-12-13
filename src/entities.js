import { PubSub } from 'pubsub-js'

export class Players {
  constructor(ship) {
    this.shipDock = []
    this.ship = ship
    this.shipArr = [6, 5, 4, 3, 2, 2]
    this.#createShipDock(this.ship, this.shipArr)
  }
  #createShipDock(ship, playerShips) {
    for (let i = 0; i < playerShips.length; i++) {
      this.shipDock.push(new ship(playerShips[i]))
    }
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
  }
  placeShip() {
    let {target,preceedingE} = this.checkGrid()
 
    return gridcontainer
  }

  // wrong
  checkGrid() {
    let gridcontainer = document.getElementById('ai-grid-container');
    let numOfGrids = gridcontainer.children.length
    let prE = []
    let randomTarget = Math.floor(Math.random() * numOfGrids)
    for (let i = 0; i < this.shipDock.length; i++) {
      for (let j = 0; j < this.shipDock[i].cellArr.length; j++) {
        if (gridcontainer.children[randomTarget].classList.contains('vacant') &&
          gridcontainer.children[randomTarget + j].classList.contains('vacant')) {
          // console.log('pushed')
          prE.push(gridcontainer.children[randomTarget + j])
        }
      else {
        // if not full and target has no class of vacant go again
        this.checkGrid()
      }
    }
  }
    console.log('done')
    return { target: gridcontainer.children[randomTarget], preceedingE: prE }
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

