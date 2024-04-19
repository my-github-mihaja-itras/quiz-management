import { User } from "../user/user.models";

export interface QuizSession {
  _id?: string;
  user: User;
  quiz: QuestionResult[];
  createdAt?: string;
}

export interface QuestionResult {
  _id?: string;
  question: string;
  userAnswer: number;
}
