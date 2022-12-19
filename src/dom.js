export class Display {
  async shipToDock(playerDock, shipDocks) {
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

  dragShip(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id)
    console.log(ev.target)
  }

  onDragShip(ev) {
    ev.preventDefault()
    // some animation here
  }
  dropShip(event) {

    const target = event.target
    const targetParent = target.parentNode;
    const grids = Array.from(targetParent.children);
    const targetNdx = grids.indexOf(target);
    const dataId = event.dataTransfer.getData('text/plain')
    const draggedDock = document.getElementById(dataId)
    const iterateChildren = draggedDock.children.length;

    const tmpCellsArr = []
    for (let i = 0; i < iterateChildren; i++) {
      draggedDock.children[0].setAttribute('style', 'background-color:var(--Frost-four)')
      const tmpCells = document.createElement('div')
      tmpCells.setAttribute('class', 'empty-dock-cell')
      tmpCellsArr.push(tmpCells)
      draggedDock.appendChild(tmpCellsArr[i])
      grids[targetNdx + i].appendChild(draggedDock.children[0])
      draggedDock.setAttribute('class', 'empty-docks')
      draggedDock.setAttribute('draggable', 'false')
    }
    console.log('done')
    return targetNdx
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
        resolve({ gl: gates[0], gr: gates[1] })
      }, gateTimer)
    })
  }
  changeScene(scene, bool) {
    let mainContainer = document.getElementById('main-container');i
    let remScene = mainContainer.children[0]
    if (bool) {
      console.log('change')
      this.gateAnim().then((ob) => {
        ob.gl.classList.replace('left-closing', 'left-closed')
        ob.gr.classList.replace('right-closing', 'right-closed')
        mainContainer.appendChild(scene.cont)
        return ob
      }).then((ob) => {
        remScene.remove()
        ob.gl.classList.replace('left-closed', 'left-opening')
        ob.gr.classList.replace('right-closed', 'right-opening')
      })
    } else {
      mainContainer.appendChild(scene.cont)
      mainContainer.children[0].remove()
    }

    return new Promise(resolve => {
      resolve(scene)
    })
  }
}

export class Scenes {
  selectionScene(playerGrids) {
    let selectionContainer = document.createElement('div')
    let outerContGrid = document.createElement('div')
    let gridCont = document.createElement('div');
    let sideBarShipDock = document.createElement('div')
    let dockContainer = document.createElement('div')
    let rdyBtn = document.createElement('button')
    let dockHeader = document.createElement('h3')
    let gridHeader = document.createElement('h3')
    dockHeader.textContent = 'SHIP DOCK'
    gridHeader.textContent = 'DRAG YOUR SHIP HERE'
    rdyBtn.textContent = 'READY'
    let docks = (length) => {
      const dockArr = []
      for (let i = 0; i < length; i++) {
        let dock = document.createElement('div')
        dock.setAttribute('class', 'dock')
        dock.setAttribute('id', `dock-${i}`)
        dock.setAttribute('draggable', 'true')
        dockArr.push(dock)
      }
      return dockArr
    }
    for (let i = 0; i < docks(6).length; i++) {
      dockContainer.append(docks(6)[i])
    }
    for (let i = 0; i < playerGrids.length; i++) {
      gridCont.appendChild(playerGrids[i])
    }
    selectionContainer.append(outerContGrid, sideBarShipDock)
    outerContGrid.append(gridHeader, gridCont)
    sideBarShipDock.append(dockHeader, dockContainer, rdyBtn)

    selectionContainer.setAttribute('id', 'selection-container')
    outerContGrid.setAttribute('id', 'outer-selection-grid-cont')
    gridCont.setAttribute('id', 'player-grid-cont')
    sideBarShipDock.setAttribute('id', 'side-bar-dock')
    dockContainer.setAttribute('id', 'dock-container')
    rdyBtn.setAttribute('id', 'ready-btn')
    return { cont: selectionContainer, docks: dockContainer.children }
  }


  gameScene(){
    let gameScene = document.createElement('div');
    let playerGrid = document.getElementById('player-grid-cont');
    let playersGridCont = document.createElement('div');
    let aIGrid = document.getElementById('ai-grid-cont');
    let announcer = document.createElement('h1');
    gameScene.appendChild(announcer,playersGridCont)
    playersGridCont.appendChild(playerGrid,aIGrid)
    gameScene.setAttribute('id','game-scene')
    playersGridCont.setAttribute('id','players-grid-container')
    aIGrid.setAttribute('id','ai-grid-cont')
    announcer.setAttribute('id','winner') 
    
    
    return {cont:gameScene}
  }

}
