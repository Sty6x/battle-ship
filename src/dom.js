export class Display {
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

  displayGrid(arr, containerQuery = '#grid-container') {
    let gridContainer = document.querySelector(containerQuery)
    for (let i = 0; i < arr.length; i++) {
      gridContainer.appendChild(arr[i])
    }
    return gridContainer
  }

  dropShip(target, dock) {
    const targetParent = target.parentNode
    const tChildren = Array.from(targetParent.children)
    const targetNdx = tChildren.indexOf(target)
    const iterateChildren = dock.children.length
    for (let i = 0; i < iterateChildren; i++) {
      tChildren[targetNdx + i].appendChild(dock.children[0])
    }
    return tChildren
  }

  // subscribe to getWinner
  displayWinner(msg, player) {
    let winner = document.getElementById('winner')
    winner.textContent = `Player ${player} Wins!`
  }

  selectionScene(){
    let mainContainer = document.getElementById('main-container');
    mainContainer.children[0].setAttribute('style','display:none;')
  }
}
