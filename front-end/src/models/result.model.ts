import {Answer, Question} from './question.model';

export interface Result {
  quizId: string;
  maxScore: number;
  userScore: number;
  date: number;
  answers: Answer[];
  playTime: number;
  userId: string;
}

export interface ResultQuestion {
  question: Question;
  userAnswer: Answer;
  correctAnswer?: Answer;
  questionScore: number;
}
