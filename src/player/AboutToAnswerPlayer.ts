import { Player, PlayerSet } from ".";
import { Board, DiceRoll } from "../Board";
import { InPenaltyBoxAndAboutToRollPlayer } from "./InPenaltyBoxAndAboutToRollPlayer";
import { NotInPenaltyBoxAndAboutToRollPlayer } from "./NotInPenaltyBoxAndAboutToRollPlayer";

export interface AboutToRollPlayer {
  player: Player;
  roll(value: DiceRoll): AboutToAnswerPlayer;
}

export class AboutToAnswerPlayer {
  public readonly player: Player;

  constructor(private readonly board: Board, private readonly players: PlayerSet) {
    this.player = this.players.getCurrentPlayer();
  }

  giveTheCorrectAnswer(): AboutToRollPlayer {
    if (this.player.isInPenaltyBox()) {
      throw Error("This player is assumed not to be in the penalty box!");
    }
    this.player.score.increment();
    if (this.player.hasWon()) {
      throw Error("Game over: " + this.player.name + " has won!");
    }
    return this.turnToNextPlayer();
  }

  giveAWrongAnswer(): AboutToRollPlayer {
    this.player.sendInPenaltyBox();
    return this.turnToNextPlayer();
  }

  private turnToNextPlayer(): AboutToRollPlayer {
    const updatedPlayers = this.players.turnToNextPlayer();
    if (updatedPlayers.getCurrentPlayer().isInPenaltyBox()) {
      return new InPenaltyBoxAndAboutToRollPlayer(this.board, updatedPlayers);
    }
    return new NotInPenaltyBoxAndAboutToRollPlayer(this.board, updatedPlayers);
  }

  pass(): AboutToRollPlayer {
    return this.turnToNextPlayer();
  }
}
