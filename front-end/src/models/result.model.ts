import {Answer, Question} from './question.model';
import {Theme} from './theme.model';

export interface Result {
  quizId: string;
  maxScore: number;
  userScore: number;
  date: number;
  answers: [];
  playTime: number;
  userId: string;
  quizResultId?: number;
  quizSuccessPercentage?: number;
  quizTries?: Result[];
  difficulty?: string;
  name?: string;
  theme?: Theme;
}

export interface ResultQuestion {
  question: Question;
  userAnswer: Answer;
  correctAnswer?: Answer;
  questionScore: number;
}
