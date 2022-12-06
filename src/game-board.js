
class GameBoard{
  constructor(player,ship){
    this.#gridx = 10;
    this.#gridy = 10;
    this.playersArr = []
  }

  getPlayers(player){
    for(let i = 0; i < 2; i++){
      this.playersArr.push(new player(ship))
    }
  }
}
