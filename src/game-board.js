import PubSub from "pubsub-js"


export class GameBoard {
  constructor() {
    this.playersArr = []
  }

  getPlayers(player,player2, ship) {
    this.playersArr.push(new player(ship))
    this.playersArr.push(new player2(ship))
    return this.playersArr
  }
  receiveAttack(targetCell) {
    if (targetCell.classList.contains('ship-cell')) {
      PubSub.publish("TargetCell", targetCell)
      return targetCell
    } else {
      return null
    }
  }
  createBoard(gridx, gridy) {
    let gridArr = []
    for (let i = 0; i < gridx; i++) {
      for (let j = 0; j < gridy; j++) {
        let grid = document.createElement('div')
       grid.classList.add('grids','vacant') 
        gridArr.push(grid)
      }
    }
    return gridArr
  }
  evalPlayers() {
    let player;
    if (this.playersArr[0].shipDock.length == 0) {
      player = 2
      PubSub.publish('getWinner', player)
      return player
    } else if (this.playersArr[1].shipDock.length == 0) {
      player = 1
      PubSub.publish('getWinner', player)
      return player
    } else {
      return 'continue game'
    }
  }
}
