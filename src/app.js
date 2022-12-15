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
    console.log(target)
    DP.changeScene(SC.selectionScene(GB.createBoard(10, 10)), true).then(data=>{
      console.log(data.docks)
      DP.shipToDock(PLAYER_ARR[0].shipDock,data.docks)
    })
  }
}
