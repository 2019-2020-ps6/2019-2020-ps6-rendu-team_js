import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Quiz} from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizCreationStatusService {

  private isQuizCreatedEmpty: boolean;
  public isQuizCreatedEmpty$: BehaviorSubject<boolean> = new BehaviorSubject(this.isQuizCreatedEmpty);

  constructor() {
    this.isQuizCreatedEmpty = true;
  }

  setQuizCreatedStatus(isEmpty: boolean) {
    this.isQuizCreatedEmpty = isEmpty;
    this.isQuizCreatedEmpty$.next(this.isQuizCreatedEmpty);
  }
}
