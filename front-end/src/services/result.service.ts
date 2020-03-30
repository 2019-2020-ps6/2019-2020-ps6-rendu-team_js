import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {Answer, Question} from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Result} from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private result: Result;
  private answer: Answer;
  private question: Question;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public result$: BehaviorSubject<Result> = new BehaviorSubject(this.result);

  public resultSelected$: Subject<Result> = new Subject();

  public resultIdSelected$: Subject<number> = new Subject();

  private resultUrl = serverUrl + '/result';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setResultFromUrl();
  }

  setResultFromUrl() {
    this.http.get<Result>(this.resultUrl).subscribe((result) => {
      this.result = result;
      this.result$.next(this.result);
    });
  }

  setSelectedResult(resultId: string) {
    const urlWithId = this.resultUrl + '/' + resultId;
    this.http.get<Result>(urlWithId).subscribe((result) => {
      console.log(result);
      this.resultSelected$.next(result);
    });
  }

  addResult(answer: object) {
    this.http.post<number>(this.resultUrl, answer, this.httpOptions).subscribe((resultId: number) => {
      this.resultIdSelected$.next(resultId);
      // console.log('res id service side', resultId);
    });
  }
}
