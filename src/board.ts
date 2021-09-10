import { Category, Question, QuestionsPool } from "./question";

export class Board {
  constructor(public size: number, public locations: Record<number, Category>, public questions: QuestionsPool) {}

  private categoriesCount(): number {
    return Object.keys(this.locations).length;
  }

  getCategory(location: number): Category {
    return this.locations[location % this.categoriesCount()];
  }

  drawQuestion(category: Category): Question {
    const question = this.questions[category].shift();
    if (!question) {
      // TODO
      // Maybe this is not an error but should be handled by the game.
      // Custom question? Reshuffle the questions? Reroll the dice?
      // Draw from another category?...
      throw new Error(`${category} questions are exhausted`);
    }
    return question;
  }
}

export const defaultBoardSize = 12;

export const defaultBoardLocations = {
  0: Category.Pop,
  1: Category.Science,
  2: Category.Sports,
  3: Category.Rock,
};
