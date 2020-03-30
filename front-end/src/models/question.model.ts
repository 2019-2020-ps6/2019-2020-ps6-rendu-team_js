export interface Answer {
    type?: string;  // ? can be empty
    value?: string;
    isCorrect?: boolean;
    questionId?: number;
    id?: number;
}

export interface Question {
  id: string;
  label: string;
  answers: Answer[];
}
