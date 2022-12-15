import './style.css'
import { Display,Scenes } from './dom.js'
import {Players,Ships,Ai} from './entities.js'
import {GameBoard} from './game-board.js'

const MAIN_CONT = document.getElementById('main-container');
const DP = new Display();
const SC = new Scenes()
const PLAYERS = new Players(Ships)
const GB = new GameBoard()

MAIN_CONT.addEventListener('click', (e) => {
  const target = e.target

  if (target.matches('#start-btn')) {
    console.log(target)
    DP.changeScene(SC.selectionScene(GB.createBoard(10,10)),true)

  }

})
