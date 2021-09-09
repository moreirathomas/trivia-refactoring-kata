export enum Category {
  Pop = "Pop",
  Rock = "Rock",
  Science = "Science",
  Sports = "Sports",
}

export interface Question {
  category: Category;
  index: number;
}
