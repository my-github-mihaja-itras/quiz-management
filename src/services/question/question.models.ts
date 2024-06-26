export interface QuestionType {
  _id?: string;
  questionNumber?: number;
  questionAsked: string;
  choice: Choice[];
  // choice: string[] | Choice[];
  trueAnswer: string;
  wasUsedDate?: Date;
  createdAt?: string;
}

export interface Choice {
  _id?: string;
  choiceValue: string;
}
