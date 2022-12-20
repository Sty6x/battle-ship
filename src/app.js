import './style.css'
import { Display, Scenes } from './dom.js'
import { Players, Ships, Ai } from './entities.js'
import { GameBoard } from './game-board.js'
import PubSub from 'pubsub-js'

const MAIN_CONT = document.getElementById('main-container');
const DP = new Display();
const SC = new Scenes()
const GB = new GameBoard()
const PLAYER_ARR = GB.getPlayers(Players, Ai, Ships)
PLAYER_ARR.forEach(player => {
  player.createShipDock()
})

MAIN_CONT.addEventListener('click', e => {
  const target = e.target;
  change(e)

  GB.receiveAttack(target)
})


PLAYER_ARR[1].shipDock.forEach(ships => {
  PubSub.subscribe("TargetCell", (msg, data) => {
    ships.isHit(data)
  })
});
PubSub.subscribe('shipSunk', (msg, data) => {
  PLAYER_ARR[1].removeShip(data)
  console.log(PLAYER_ARR[1].shipDock)
})

async function change(e) {
  const target = e.target
  if (target.matches('#start-btn')) {

    DP.changeScene(SC.selectionScene(GB.createBoard(10, 10)), true).then(data => {
      DP.shipToDock(PLAYER_ARR[0].shipDock, data.docks)
    })
  }
  if (target.matches('#ready-btn')) {
    let AIGrid = DP.appendGrid(GB.createBoard(10, 10), 'ai-grid-cont')
    DP.changeScene(SC.gameScene(AIGrid), true).then(data => {
      data.gridsCont.appendChild(AIGrid)
      PLAYER_ARR[1].placeShip(AIGrid)
    })
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
