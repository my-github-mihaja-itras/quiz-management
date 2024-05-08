import { QuestionType } from "../question/question.models";
import { User } from "../user/user.models";

export interface QuizSession {
  _id?: string;
  quizNumber: string;
  quiz: QuestionResult[];
  createdAt?: string;
}

export interface QuestionResult {
  _id?: string;
  userAnswer: string;
  trueAnswer: string;
  isValidAnswer?: boolean;
  question: QuestionType;
}
