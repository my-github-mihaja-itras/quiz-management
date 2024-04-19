import { User } from "../user/user.models";

export interface QuizSession {
  _id?: string;
  user: User;
  quiz: QuestionResult[];
}

export interface QuestionResult {
  question: string;
  userAnswer: number;
}
