export class Player {
  public purse = 0; // A player win if they have 6
  public isInPenaltyBox = false; // Answered wrongly on previous turn

  public position = 0; // Goes from 0 to 12
  public isGettingOutOfPenaltyBox = false; // True if rolled odd

  constructor(public id: number, public name: string) {}

  public move(amount: number): void {
    // There are 12 positions on the board
    this.position = (this.position + amount) % 12;
  }
}
