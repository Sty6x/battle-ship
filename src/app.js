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
let isTurn = true;
let isGame;

MAIN_CONT.addEventListener('click', e => {
  const target = e.target;
  change(e)
  if (isGame) {
    if (isTurn && target.classList.contains('ship-cell')) {
      console.log(target)
      GB.receiveAttack(target)
      isTurn = false
    }
    if (!isTurn) {
      setTimeout(() => {
        const AiTarget = PLAYER_ARR[1].attack()
        GB.receiveAttack(AiTarget)
        isTurn = true;
      }, 300)
    }
  }
})

PLAYER_ARR[0].shipDock.forEach(ships => {
  PubSub.subscribe("TargetCell", (msg, data) => {
    ships.isHit(data)
  })
});
PLAYER_ARR[1].shipDock.forEach(ships => {
  PubSub.subscribe("TargetCell", (msg, data) => {
    ships.isHit(data)
  })
});

PubSub.subscribe('getWinner', (msg, data) => {
  isGame = false;
  DP.displayWinner(msg,data)
})
PubSub.subscribe('shipSunkAI', (msg, data) => {
  PLAYER_ARR[1].removeShip(data)
  console.log(GB.evalPlayers())
  console.log({ this: PLAYER_ARR[0], dock: PLAYER_ARR[0].shipDock })
  console.log({ this: PLAYER_ARR[1], dock: PLAYER_ARR[1].shipDock })
})

PubSub.subscribe('shipSunkPlayer', (msg, data) => {
  PLAYER_ARR[0].removeShip(data)
  console.log(GB.evalPlayers())
  console.log({ this: PLAYER_ARR[0], dock: PLAYER_ARR[0].shipDock })
  console.log({ this: PLAYER_ARR[1], dock: PLAYER_ARR[1].shipDock })
})
async function change(e) {
  const target = e.target
  if (target.matches('#start-btn')) {
    isGame = true
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
