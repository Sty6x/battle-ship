import './style.css'
import { Display } from './dom.js'

const MAIN_CONT = document.getElementById('main-container');
const DP = new Display();

MAIN_CONT.addEventListener('click', (e) => {
  const target = e.target

  console.log(target)
  if (target.matches('#start-btn')) {
    console.log(target)
    DP.selectionScene()
  }

})
