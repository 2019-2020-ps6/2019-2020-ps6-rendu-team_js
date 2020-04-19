import { Question } from './question.model';

// tslint:disable-next-line:no-empty-interface
export interface Game {
  playTime: number;
  date: number;
  quizId: string;
  answers: [];
  userId: number;
}
