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
    // stores the length on a different memory location
    // so we can iterate through the length without having 
    // it decrement every time a child is moved to another 
    // parent element
    const iterateChildren = dock.children.length
    for (let i = 0; i < iterateChildren; i++) {
      tChildren[targetNdx + i].appendChild(dock.children[0])
      // since everytime we append a child from one parent to another
      // it physically moves the children to the new parent so
      // instead of iterating and travelling through
      // each child of the old parent we can just
      // iterate the first element and move each element like a queue
    }
    return tChildren
  }
}
