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
    this.location = new Location(this.name);
    this.score = new Score(this.name);
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
    console.log(this.name + " is the current player");
    console.log("They have rolled a " + value);

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

    console.log(this.name + " is not getting out of the penalty box");
  }

  giveTheCorrectAnswer(players: PlayerSet): boolean {
    if (!this._isInPenaltyBox) {
      console.log("Answer was correct!!!!");
      this.score.increment();
      const gameMustContinue = !(this.score.get() == NUMBER_OF_POINTS_REQUIRED_TO_WIN);
      players.turnToNextPlayer();
      return gameMustContinue;
    }
    players.turnToNextPlayer();
    const gameMustContinue = true;
    return gameMustContinue;
  }

  giveAWrongAnswer(players: PlayerSet): boolean {
    console.log("Question was incorrectly answered");
    this.sendInPenaltyBox();
    players.turnToNextPlayer();
    return true;
  }

  private sendInPenaltyBox(): void {
    this._isInPenaltyBox = true;
    console.log(this.name + " was sent to the penalty box");
  }

  private getOutFromPenaltyBox(): void {
    this._isInPenaltyBox = false;
    console.log(this.name + " is getting out of the penalty box");
  }
}
