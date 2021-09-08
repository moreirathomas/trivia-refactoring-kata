import { Location } from "./location";
import { Score } from "./score";

const NUMBER_OF_POINTS_REQUIRED_TO_WIN = 6;

export class Player {
  readonly location = new Location();
  readonly score = new Score();
  private _isInPenaltyBox = false;

  constructor(public readonly name: String) {}

  isInPenaltyBox(): boolean {
    return this._isInPenaltyBox;
  }

  sendInPenaltyBox(): void {
    this._isInPenaltyBox = true;
  }

  getOutFromPenaltyBox(): void {
    this._isInPenaltyBox = false;
  }

  getLocation(): number {
    return this.location.get();
  }

  getScore(): number {
    return this.score.get();
  }
}
