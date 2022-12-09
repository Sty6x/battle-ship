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

  displayGrid (arr){
      let gridContainer = document.querySelector('.grid-container')
      for (let i = 0; i < arr.length; i++) {
        gridContainer.appendChild(arr[i])
      }
      return gridContainer
    }
}
