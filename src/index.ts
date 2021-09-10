import { Board, defaultBoardLocations, defaultBoardSize } from "./board";
import { Player } from "./player";
import { Category, defaultQuestionsPool } from "./question";

export class Game {
  private players: Player[] = [];

  private currentPlayerIndex: number = 0;

  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  private playersCount(): number {
    return this.players.length;
  }

  private board: Board;

  constructor() {
    this.board = new Board(defaultBoardSize, defaultBoardLocations, defaultQuestionsPool());
  }

  public add(name: string): void {
    const player = new Player(this.playersCount() + 1, name);
    this.players.push(player);
    logNewPlayerAdded(player);
  }

  public roll(roll: number) {
    const player = this.getCurrentPlayer();

    logNewTurnState(player, roll);

    if (player.isInPenaltyBox) {
      // Do not get out if player rolled even: return early.
      const isRollOdd = roll % 2 !== 0;
      player.isGettingOutOfPenaltyBox = isRollOdd;

      logPenaltyBoxState(player);

      if (!player.isGettingOutOfPenaltyBox) {
        return;
      }
    }

    player.move(roll);

    logNewBoardLocation(player, this.board.getCategory(player.position));

    const question = this.board.drawQuestion(this.board.getCategory(player.position));
    console.log(question.toString());
  }

  public wasCorrectlyAnswered(): boolean {
    const player = this.getCurrentPlayer();

    if (player.isInPenaltyBox && !player.isGettingOutOfPenaltyBox) {
      return this.continue();
    }

    player.coins++;
    logAnswerWasCorrect(player);

    return this.continueIfNoWinner();
  }

  public wrongAnswer(): boolean {
    const player = this.getCurrentPlayer();

    logAnswerWasWrong(player);
    player.isInPenaltyBox = true;

    return this.continueIfNoWinner();
  }

  private continue(): boolean {
    // Set next player.
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex == this.players.length) {
      this.currentPlayerIndex = 0;
    }
    return true;
  }

  private continueIfNoWinner(): boolean {
    this.continue(); // Discard return value.
    return this.getCurrentPlayer().coins !== 6;
  }
}

const logNewTurnState = (player: Player, roll: number): void => {
  console.log(player.name + " is the current player");
  console.log("They have rolled a " + roll);
};

const logNewBoardLocation = (player: Player, category: Category): void => {
  console.log(player.name + "'s new location is " + player.position);
  console.log("The category is " + category);
};

const logPenaltyBoxState = (player: Player): void => {
  if (player.isGettingOutOfPenaltyBox) {
    console.log(player.name + " is getting out of the penalty box");
  } else {
    console.log(player.name + " is not getting out of the penalty box");
  }
};

const logNewPlayerAdded = (player: Player): void => {
  console.log(player.name + " was added");
  console.log("They are player number " + player.indexInTurn);
};

const logAnswerWasCorrect = (player: Player): void => {
  console.log("Answer was correct!!!!");
  console.log(player.name + " now has " + player.coins + " Gold Coins.");
};

const logAnswerWasWrong = (player: Player): void => {
  console.log("Question was incorrectly answered");
  console.log(player.name + " was sent to the penalty box");
};
