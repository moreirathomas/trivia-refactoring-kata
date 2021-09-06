import { DiceRoll } from ".";
import { Category, PoolOfQuestions } from "./question";
import { Board } from "./Board";

interface ConstructorArguments {
  size: number;
  questionPoolSize: number;
}

export class CircularBoard implements Board {
  private size: number;

  private readonly locationToCategoryMap: Record<0 | 1 | 2 | 3, Category> = {
    0: "Pop",
    1: "Science",
    2: "Sports",
    3: "Rock",
  };

  private readonly questions: PoolOfQuestions;

  constructor({ size, questionPoolSize }: ConstructorArguments) {
    this.size = size;
    this.questions = new PoolOfQuestions(questionPoolSize);
  }

  computeLocationAfterRoll(location: number, roll: DiceRoll): number {
    return (location + roll) % this.size;
  }

  askQuestion(location: number): void {
    const category = this.locationToCategoryMap[location % 4];
    console.log("The category is " + category);
    console.log(this.questions.getNextQuestion(category));
  }
}
