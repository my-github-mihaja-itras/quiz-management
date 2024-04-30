import { QuestionType } from "../question/question.models";
import { User } from "../user/user.models";

export interface QuizSession {
  _id?: string;
  quizNumber:string;
  quiz: QuestionResult[];
  createdAt?: string;
}

export interface QuestionResult {
  _id?: string;
  question:  QuestionType;
  userAnswer: string;
}
