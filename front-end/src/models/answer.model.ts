export interface Answer {
    type?: string;  // ? can be empty
    value?: string;
    isCorrect?: boolean;
    questionId?: number;
    id?: number;
    deleted?: boolean;
}
