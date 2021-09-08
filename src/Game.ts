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

  withPlayer(player: Player): Game {
    return new Game([...this.players, player], this.poolSize);
  }

  withPoolSize(poolSize: number): Game {
    return new Game(this.players, poolSize);
  }

  build(): NotInPenaltyBoxAndAboutToRollPlayer {
    const board = new CircularBoard({
      size: BOARD_SIZE,
      questionPoolSize: this.poolSize,
    });

    const playerSet = new PlayerSet(this.players);

    return new NotInPenaltyBoxAndAboutToRollPlayer(board, playerSet);
  }
}
