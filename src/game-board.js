import PubSub from "pubsub-js"


export class GameBoard {
  constructor() {
    this.playersArr = []
  }

  getPlayers(player, ship) {
    for (let i = 0; i < 2; i++) {
      this.playersArr.push(new player(ship))
    }
    return this.playersArr
  }
  receiveAttack(targetCell) {
    if (targetCell.classList.contains('ship-cell')) {
      PubSub.publish("Target Cell", targetCell)
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
        grid.setAttribute('class', 'grid')
        gridArr.push(grid)
      }
    }
    return gridArr
  }
  evalPlayers() {
    let player;
    if (this.playersArr[0].shipDock.length == 0) {
      player = 2
      this.getWinner(player)
      return player
    } else if (this.playersArr[1].shipDock.length == 0) {
      player = 1
      this.getWinner(player)
      return player
    } else {
      return 'continue game'
    }
  }

  getWinner(player) {
    document.body.innerHTML =
      `<p class='winner'></p>`
    let winner = document.querySelector('.winner')
    winner.textContent = `Player ${player} Wins`
    return winner.textContent
  }
}
