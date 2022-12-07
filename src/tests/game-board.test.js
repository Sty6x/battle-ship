import { GameBoard } from '../game-board.js'


describe('Instantiated GameBoard should create players and store them into an array', () => {
  class Ships {
    constructor() {
      this.id = 'ship'
    }
  }
  class Players {
    constructor(ship) {
      this.id = 'player'
      this.ship = new ship()
    }
  }
  let board = new GameBoard()
  test('Create 2 Players and Let Player constructor take in a Ship Constructor', () => {
    expect(board.getPlayers(new Players(Ships))).toEqual([{ "id": "player", "ship": { "id": "ship" } }, { "id": "player", "ship": { "id": "ship" } }])
  })
})

describe('Receive Attack returning an a target cell', () => {
  let board = new GameBoard()
  let dummyTarget = document.createElement('div')
  dummyTarget.setAttribute('class', 'ship-cell')
  test('target to be a div of class ship-cell', () => {
    expect(board.receiveAttack(dummyTarget)).toEqual(dummyTarget)
  })

  let errorTarget = document.createElement('div')
  errorTarget.setAttribute('class', 'grid')
  test('should return Null if target has no class of ship-cell', () => {
    expect(board.receiveAttack(errorTarget)).toBeNull()
  })
})


describe('Creating Board with passed in gridx and gridy', () => {
  let board = new GameBoard();
  test('gameBoard should be 100', () => {
    expect(board.createBoard(10, 10).length).toBe(100)
  })
  test('gameBoard should be 50', () => {
    expect(board.createBoard(5, 10).length).toBe(50)
  })
  test('gameBoard should be 25', () => {
    expect(board.createBoard(5, 5).length).toBe(25)
  })

})

describe('Evaluating Each Players array', () => {
  let board = new GameBoard();
  let ship = [5, 2, 1, 5]
  class Players {
    constructor(ships) {
      this.shipDock = ships
    }
  }
  board.getPlayers(new Players(ship))
  test('should continue', () => {
    expect(board.evalPlayers()).toEqual('continue game')
  })

  test('should return player 2 wins', () => {
    board.playersArr[0].shipDock = []
    expect(board.evalPlayers()).toEqual(2)
  })

})

describe('Calls the Winner of the Game', () => {
  let board = new GameBoard()
  test('expect to show that player 2 to wins', () => {
    document.body.innerHTML =
      `<p class='winner'>Player 2 Wins</p>`
    let winner = document.querySelector('.winner')
    expect(board.getWinner(2)).toEqual(winner.textContent)
  })
  test('expect to show that player 1 to wins', () => {
    document.body.innerHTML =
      `<p class='winner'>Player 1 Wins</p>`
    let winner = document.querySelector('.winner')
    expect(board.getWinner(1)).toEqual(winner.textContent)
  })
})