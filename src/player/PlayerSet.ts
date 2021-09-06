import { Player } from ".";

export class PlayerSet {
  private index: number = 0;

  constructor(private readonly players: Player[]) {}

  getCurrentPlayer(): Player {
    return this.players[this.index];
  }

  turnToNextPlayer(): Player {
    this.index = (this.index + 1) % this.players.length;
    return this.getCurrentPlayer();
  }
}
