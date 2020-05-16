import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Quiz} from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizListStatusService {

  private quizIdOpened: string;
  public quizIdOpened$: BehaviorSubject<string> = new BehaviorSubject(this.quizIdOpened);

  constructor() {
    this.quizIdOpened = '';
  }

  setOpenedQuiz(quiz: Quiz) {
    this.quizIdOpened = quiz.id;
    this.quizIdOpened$.next(this.quizIdOpened);
  }
}
