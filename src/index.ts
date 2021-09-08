import { CircularBoard, DiceRoll } from "./Board";
import { Player, PlayerSet } from "./player";

const BOARD_SIZE = 12;
const QUESTION_POOLS_SIZE = 50;

export class Game {
  private readonly board = new CircularBoard({
    size: BOARD_SIZE,
    questionPoolSize: QUESTION_POOLS_SIZE,
  });

  private readonly players: PlayerSet;

  constructor(players: Player[]) {
    this.players = new PlayerSet(players);
  }

  roll(value: DiceRoll): void {
    this.players.getCurrentPlayer().roll(this.board, value);
  }

  currentPlayerGivesTheCorrectAnswer(): void {
    return this.players.getCurrentPlayer().giveTheCorrectAnswer(this.players);
  }

  currentPlayerGivesAWrongAnswer(): void {
    return this.players.getCurrentPlayer().giveAWrongAnswer(this.players);
  }
}
