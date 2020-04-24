import {Answer} from './answer.model';

export interface Question {
  id: string;
  label: string;
  answers: Answer[];
}
