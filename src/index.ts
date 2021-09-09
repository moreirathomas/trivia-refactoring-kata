import { Player } from "./player";
import { Category, Question } from "./question";

export class Game {
  private players: Player[] = [];

  private currentPlayerIndex: number = 0;

  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  private playersCount(): number {
    return this.players.length;
  }

  private questions: Record<Category, Question[]> = { Pop: [], Rock: [], Science: [], Sports: [] };

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.questions.Pop.push({ category: Category.Pop, index: i });
      this.questions.Rock.push({ category: Category.Rock, index: i });
      this.questions.Science.push({ category: Category.Science, index: i });
      this.questions.Sports.push({ category: Category.Sports, index: i });
    }
  }

  public add(name: string): void {
    const player = new Player(this.playersCount() + 1, name);
    this.players.push(player);
    console.log(player.name + " was added");
    console.log("They are player number " + player.id);
  }

  public roll(roll: number) {
    const player = this.getCurrentPlayer();

    console.log(player.name + " is the current player");
    console.log("They have rolled a " + roll);

    if (player.isInPenaltyBox) {
      // Do not get out if player rolled even: return early.
      if (roll % 2 == 0) {
        console.log(player.name + " is not getting out of the penalty box");
        player.isGettingOutOfPenaltyBox = false;
        return;
      }
      player.isGettingOutOfPenaltyBox = true;
      console.log(player.name + " is getting out of the penalty box");
    }

    player.move(roll);

    console.log(player.name + "'s new location is " + player.position);
    console.log("The category is " + this.currentCategory(this.getCurrentPlayer().position));
    this.askQuestion(this.currentCategory(this.getCurrentPlayer().position));
  }

  private askQuestion(category: Category): void {
    const question = this.questions[category].shift();
    // TODO unhandled case in legacy code.
    if (!question) {
      console.log(`out of ${this.currentCategory(this.getCurrentPlayer().position)} question !`);
      return;
    }
    console.log(`${question.category} Question ${question.index}`);
  }

  /**
   * Returns the current category given the position of the current player.
   */
  private currentCategory(position: number): Category {
    const categoriesPerPosition = [Category.Pop, Category.Science, Category.Sports, Category.Rock];
    return categoriesPerPosition[position % categoriesPerPosition.length];
  }

  /**
   * Changes the game state to reflect a correct answer by the current player.
   */
  public correctAnwser(): boolean {
    const player = this.getCurrentPlayer();

    if (player.isInPenaltyBox && !player.isGettingOutOfPenaltyBox) {
      this.nextPlayerTurn();
      return true;
    }

    console.log("Answer was correct!!!!");
    player.purse++;
    console.log(player.name + " now has " + player.purse + " Gold Coins.");

    // FIXME continue relies on the current player.
    // We cannot move to the next player before the check.
    const shouldContinue = this.continue();

    this.nextPlayerTurn();

    return shouldContinue;
  }

  /**
   * Changes the game state to reflect a wrong answer by the current player.
   */
  public wrongAnswer(): boolean {
    const player = this.getCurrentPlayer();

    console.log("Question was incorrectly answered");

    console.log(player.name + " was sent to the penalty box");
    player.isInPenaltyBox = true;

    this.nextPlayerTurn();
    return true;
  }

  private nextPlayerTurn(): void {
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;
  }

  /**
   * States whether or not the game should continue.
   * The game continues until a player has 6 Gold Coins.
   */
  // TODO return the next player ?
  private continue(): boolean {
    return this.getCurrentPlayer().purse !== 6;
  }
}
