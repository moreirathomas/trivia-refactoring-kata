import { Player, PlayerSet } from ".";
import { Board, DiceRoll } from "../Board";
import isEven from "../utils/isEven";
import { AboutToAnswerPlayer } from "./AboutToAnswerPlayer";

export class InPenaltyBoxAndAboutToRollPlayer {
  public readonly player: Player;

  constructor(private readonly board: Board, private readonly players: PlayerSet) {
    this.player = this.players.getCurrentPlayer();
  }

  roll(value: DiceRoll): AboutToAnswerPlayer {
    if (isEven(value)) {
      this.board.askQuestion(this.player.location.get());
      return new AboutToAnswerPlayer(this.board, this.players);
    }
    this.player.getOutFromPenaltyBox();
    this.player.location.move(this.board, value);
    this.board.askQuestion(this.player.location.get());
    return new AboutToAnswerPlayer(this.board, this.players);
  }
}
