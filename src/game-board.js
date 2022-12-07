
export class GameBoard {
  constructor(x, y) {
    this.gridx = x;
    this.gridy = y;
    this.playersArr = []
  }

  getPlayers(player) {
    for (let i = 0; i < 2; i++) {
      this.playersArr.push(player)
    }
    return this.playersArr
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

}
