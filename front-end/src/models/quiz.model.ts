import { Question } from './question.model';
import {Theme} from './theme.model';

export interface Quiz {
    id: string;
    name: string;
    themeId: string;
    theme?: Theme;
    questions?: Question[];
    nbQuestions?: number;
    difficulty: string;
}
