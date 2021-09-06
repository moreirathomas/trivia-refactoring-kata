import { Category } from ".";
import { PoolOfQuestionsInCategory } from "./PoolOfQuestionsInCategory";

export class PoolOfQuestions {
  private readonly questions: Record<Category, PoolOfQuestionsInCategory>;

  constructor(private readonly poolSize: number) {
    this.questions = {
      Pop: new PoolOfQuestionsInCategory("Pop", this.poolSize),
      Science: new PoolOfQuestionsInCategory("Science", this.poolSize),
      Sports: new PoolOfQuestionsInCategory("Sports", this.poolSize),
      Rock: new PoolOfQuestionsInCategory("Rock", this.poolSize),
    };
  }

  getNextQuestion(category: Category): string {
    return this.questions[category].getNextQuestion();
  }
}
