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
  async gateAnim() {
    return new Promise(resolve => {
      let gates = Array.from(document.querySelectorAll('.gates'))
      gates[0].classList.replace('left-open', 'left-closing')
      gates[1].classList.replace('right-open', 'right-closing')
      let leftGate = document.querySelector('.left-closing')
      let gateStyle = getComputedStyle(leftGate)
      let gateTimer = gateStyle.animationDuration.slice(0, gateStyle.animationDuration.length - 1) * 1000
      setTimeout(() => {
        resolve({gl: gates[0], gr: gates[1] })
      }, gateTimer)
    })
  }
  async changeScene(scene, bool) {
    let mainContainer = document.getElementById('main-container');
    let remScene = mainContainer.children[0]
    if (bool) {
      console.log('change')
      this.gateAnim().then((ob) => {
        console.log(ob.gl.classList)
        ob.gl.classList.replace('left-closing', 'left-closed')
        ob.gr.classList.replace('right-closing', 'right-closed')
        console.log(ob.gl.classList)
        remScene.remove()
        return ob
      }).then((ob) => {
        mainContainer.appendChild(scene)
        ob.gl.classList.replace('left-closed', 'left-opening')
        ob.gr.classList.replace('right-closed', 'right-opening')
          console.log(ob.gl.classList)
      })

    } else {
      mainContainer.children[0].remove()
    }
  }

}

export class Scenes {

  selectionScene(playerGrids) {
    let selectionContainer = document.createElement('div')
    let gridCont = document.createElement('div');
    let sideBarShipDock = document.createElement('div')
    selectionContainer.append(gridCont, sideBarShipDock)
    selectionContainer.setAttribute('id', 'selection-container')
    gridCont.setAttribute('id', 'player-grid-cont')
    sideBarShipDock.setAttribute('id', 'side-bar-dock')
    for (let i = 0; i < playerGrids.length; i++) {
      gridCont.appendChild(playerGrids[i])
    }
    return selectionContainer
  }

}
