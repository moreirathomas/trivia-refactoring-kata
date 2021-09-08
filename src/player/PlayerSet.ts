import { Player } from ".";

export class PlayerSet {
  constructor(private readonly players: Player[], private readonly index: number = 0) {}

  getCurrentPlayer(): Player {
    return this.players[this.index];
  }

  turnToNextPlayer(): PlayerSet {
    return new PlayerSet(this.players, (this.index + 1) % this.players.length);
  }
}
