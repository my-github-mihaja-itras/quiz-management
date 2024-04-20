export interface QuestionType {
  _id?: string;
  questionNumber?: number;
  questionAsked: string;
  choice: string[];
  trueAnswer: number;
  wasUsedDate?: Date;
}

// export interface ChoiceOptions {
//   choiceOptions: string;
// }

export interface QuestionTypeToInsert {
  questionAsked: string;
  choice: string[];
  trueAnswer: number;
}
