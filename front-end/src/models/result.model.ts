import {Answer} from './question.model';

export interface Result {
  quizId: string;
  maxScore: number;
  userScore: number;
  date: number;
  answers: Answer[];
  playTime: number;
  userId: string;
}
