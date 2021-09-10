import { CircularBoard } from "./Board";
import { Player, PlayerSet } from "./player";
import { NotInPenaltyBoxAndAboutToRollPlayer } from "./player/NotInPenaltyBoxAndAboutToRollPlayer";

const BOARD_SIZE = 12;
const DEFAULT_QUESTION_POOLS_SIZE = 50;

export class Game {
  private constructor(private players: Player[], private poolSize: number = DEFAULT_QUESTION_POOLS_SIZE) {}

  static builder(): Game {
    return new Game([]);
  }

  withPlayers(...players: Player[]): Game {
    return new Game([...this.players, ...players], this.poolSize);
  }

  withPoolSize(poolSize: number): Game {
    return new Game(this.players, poolSize);
  }

  build(): NotInPenaltyBoxAndAboutToRollPlayer {
    if (this.players.length < 2) {
      throw new Error("The game cannot start without at least 2 players");
    }

    const board = new CircularBoard({
      size: BOARD_SIZE,
      questionPoolSize: this.poolSize,
    });

    const playerSet = new PlayerSet(this.players);

    return new NotInPenaltyBoxAndAboutToRollPlayer(board, playerSet);
  }
}
