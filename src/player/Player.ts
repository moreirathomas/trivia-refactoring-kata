import { PlayerSet } from ".";
import { Board, DiceRoll } from "../Board";
import { Location } from "./location";
import { Score } from "./score";
import isOdd from "../utils/isOdd";

const NUMBER_OF_POINTS_REQUIRED_TO_WIN = 6;

export class Player {
  private readonly location: Location;
  private readonly score: Score;
  private _isInPenaltyBox = false;

  constructor(public readonly name: String) {
    this.location = new Location();
    this.score = new Score();
  }

  isInPenaltyBox(): boolean {
    return this._isInPenaltyBox;
  }

  getLocation(): number {
    return this.location.get();
  }

  getScore(): number {
    return this.score.get();
  }

  roll(board: Board, value: DiceRoll): void {
    if (!this._isInPenaltyBox) {
      this.location.move(board, value);
      board.askQuestion(this.location.get());
      return;
    }

    if (isOdd(value)) {
      this.getOutFromPenaltyBox();
      this.location.move(board, value);
      board.askQuestion(this.location.get());
      return;
    }
  }

  giveTheCorrectAnswer(players: PlayerSet): void {
    if (!this._isInPenaltyBox) {
      this.score.increment();
      players.turnToNextPlayer();
      return;
    }
    players.turnToNextPlayer();
  }

  giveAWrongAnswer(players: PlayerSet): void {
    this.sendInPenaltyBox();
    players.turnToNextPlayer();
  }

  private sendInPenaltyBox(): void {
    this._isInPenaltyBox = true;
  }

  private getOutFromPenaltyBox(): void {
    this._isInPenaltyBox = false;
  }
}
