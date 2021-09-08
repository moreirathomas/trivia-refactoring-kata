import { Board, DiceRoll } from "../../Board";

export class Location {
  private location = 0;

  get(): number {
    return this.location;
  }

  public move(board: Board, value: DiceRoll): void {
    this.location = board.computeLocationAfterRoll(this.location, value);
  }
}
