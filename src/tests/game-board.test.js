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


})


describe('Creating Board with passed in gridx and gridy', () => {
  let board = new GameBoard();
  test('gameBoard should be 100', () => {
    expect(board.createBoard(10, 10).length).toBe(100)
  })

})
