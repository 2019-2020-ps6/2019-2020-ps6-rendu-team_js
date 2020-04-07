import { Question } from './question.model';

export interface Quiz {
    id: string;
    name: string;
    themeId: string;
    questions: Question[];
    difficulty: string;
}
