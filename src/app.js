import './style.css'
import { Display, Scenes } from './dom.js'
import { Players, Ships, Ai } from './entities.js'
import { GameBoard } from './game-board.js'

const MAIN_CONT = document.getElementById('main-container');
const DP = new Display();
const SC = new Scenes()
const GB = new GameBoard()
const PLAYER_ARR = GB.getPlayers(Players, Ai, Ships)


MAIN_CONT.addEventListener('click', change)

async function change(e) {
  const target = e.target
  if (target.matches('#start-btn')) {
    DP.changeScene(SC.selectionScene(GB.createBoard(10, 10)), true).then(data => {
      DP.shipToDock(PLAYER_ARR[0].shipDock, data.docks)
    })
  }
  console.log(target)
  if(target.matches('#ready-btn')){
    SC.gameScene()
  }
}
// draggTarget
MAIN_CONT.addEventListener('dragstart', DP.dragShip)
MAIN_CONT.addEventListener('dragover', DP.onDragShip)
MAIN_CONT.addEventListener('drop', (e) => {
  let target = e
  if (e.target.matches('.grids')) {
    DP.dropShip(target)
  }

})
