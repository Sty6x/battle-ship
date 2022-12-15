import './style.css'
import { Display, Scenes } from './dom.js'
import { Players, Ships, Ai } from './entities.js'
import { GameBoard } from './game-board.js'

const MAIN_CONT = document.getElementById('main-container');
const DP = new Display();
const SC = new Scenes()
const GB = new GameBoard()
const PLAYER_ARR = GB.getPlayers(Players, Ai, Ships)
console.log(PLAYER_ARR)
let docks = Array.from(document.querySelectorAll('.dock'))

MAIN_CONT.addEventListener('click', (e) => {
  const target = e.target

  if (target.matches('#start-btn')) {
    console.log(target)
    DP.changeScene(SC.selectionScene(GB.createBoard(10, 10)), true)    
    // DP.shipToDock(PLAYER_ARR[0].shipDock, docks)
    console.log(docks)
  }

})
