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
    players.forEach(({ name }, index) => {
      console.log(name + " was added");
      console.log("They are player number " + (index + 1));
    });
  }

  roll(value: DiceRoll): void {
    this.players.getCurrentPlayer().roll(this.board, value);
  }

  currentPlayerGivesTheCorrectAnswer(): boolean {
    return this.players.getCurrentPlayer().giveTheCorrectAnswer(this.players);
  }

  currentPlayerGivesAWrongAnswer(): boolean {
    return this.players.getCurrentPlayer().giveAWrongAnswer(this.players);
  }
}
