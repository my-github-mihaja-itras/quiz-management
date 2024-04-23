export interface QuestionType {
  _id?: string;
  questionNumber?: number;
  questionAsked: string;
  choice: string[] | Choice[];
  trueAnswer: number;
  wasUsedDate?: Date;
}

export interface Choice {
  _id?:string;
  choiceValue: string;
}
