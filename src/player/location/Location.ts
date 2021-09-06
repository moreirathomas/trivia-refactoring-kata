import { Board, DiceRoll } from "../../Board";

export class Location {
  private location = 0;

  constructor(private readonly playerName: String) {}

  get(): number {
    return this.location;
  }

  public move(board: Board, value: DiceRoll): void {
    this.location = board.computeLocationAfterRoll(this.location, value);
    console.log(`${this.playerName}'s new location is ${this.location}`);
  }
}
