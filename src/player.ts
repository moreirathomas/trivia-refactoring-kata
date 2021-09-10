export class Player {
  public coins = 0; // A player win if they have 6

  // A Player goes into penalty box if they answered wrongly
  // on their previous turn. While in penalty box, they cannot
  // move forward on the board.
  public isInPenaltyBox = false;
  public position = 0; // Goes from 0 to 12
  public isGettingOutOfPenaltyBox = false; // True if rolled odd

  constructor(public indexInTurn: number, public name: string) {}

  public move(amount: number): void {
    // There are 12 positions on the board
    this.position = (this.position + amount) % 12;
  }

  // public roll(value: RollValue) {}

  // public anwserCorrectly() {}

  // public answerWrongly() {}
}
