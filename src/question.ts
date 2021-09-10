export enum Category {
  Pop = "Pop",
  Rock = "Rock",
  Science = "Science",
  Sports = "Sports",
}

export class Question {
  constructor(public category: Category, public indexInCategory: number) {}

  toString(): string {
    return `${this.category} Question ${this.indexInCategory}`;
  }
}

export type QuestionsPool = Record<Category, Question[]>;

export const defaultQuestionsPool = (): QuestionsPool => {
  const questions: QuestionsPool = { Pop: [], Rock: [], Science: [], Sports: [] };

  for (let i = 0; i < 50; i++) {
    questions.Pop.push(new Question(Category.Pop, i));
    questions.Rock.push(new Question(Category.Rock, i));
    questions.Science.push(new Question(Category.Science, i));
    questions.Sports.push(new Question(Category.Sports, i));
  }
  return questions;
};
