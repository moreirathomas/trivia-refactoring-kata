import { Category } from ".";

export class PoolOfQuestionsInCategory {
  private questions: string[];
  private numberOfQuestionsAsked = 0;

  constructor(private readonly category: Category, private readonly poolSize: number) {
    this.questions = [...Array(this.poolSize)].map((_, i) => this.generateQuestion(i));
  }

  getNextQuestion(): string {
    return this.questions[this.numberOfQuestionsAsked++];
  }

  private generateQuestion(index: number): string {
    return `${this.category} Question ${index}`;
  }
}
