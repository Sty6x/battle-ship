export class Display {
  constructor() {
  }
  //shipToDock will subscribe to 'sendDock'
  shipToDock(playerDock, shipDocks) {
    for (let i = 0; i < playerDock.length; i++) {
      let tmpDock = playerDock[i]
      for (let j = 0; j < tmpDock.cellArr.length; j++) {
        shipDocks[i].appendChild(tmpDock.cellArr[j])
      }
    }
    return shipDocks
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
