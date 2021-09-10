import { Category } from ".";

export class PoolOfQuestionsInCategory {
  private questions: string[];
  private numberOfQuestionsAsked = 0;

  constructor(private readonly category: Category, private readonly poolSize: number) {
    this.questions = [...Array(this.poolSize)].map((_, i) => this.generateQuestion(i));
  }

  getNextQuestion(): string {
    const question = this.questions[this.numberOfQuestionsAsked];
    this.numberOfQuestionsAsked++;

    if (question) {
      return question;
    }
    // We exhausted the pool for this category. Reshuffle the questions.
    this.numberOfQuestionsAsked = 0;
    return this.getNextQuestion();
  }

  private generateQuestion(index: number): string {
    return `${this.category} Question ${index}`;
  }
}
