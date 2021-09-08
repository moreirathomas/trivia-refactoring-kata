import { Player, PlayerSet } from ".";
import { Board, DiceRoll } from "../Board";
import { AboutToAnswerPlayer, AboutToRollPlayer } from "./AboutToAnswerPlayer";

export class NotInPenaltyBoxAndAboutToRollPlayer implements AboutToRollPlayer {
  public readonly player: Player;

  constructor(private readonly board: Board, private readonly players: PlayerSet) {
    this.player = this.players.getCurrentPlayer();
  }

  roll(value: DiceRoll): AboutToAnswerPlayer {
    this.player.location.move(this.board, value);
    this.board.askQuestion(this.player.location.get());
    return new AboutToAnswerPlayer(this.board, this.players);
  }
}
