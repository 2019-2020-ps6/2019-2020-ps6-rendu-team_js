import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
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
  public answer$: BehaviorSubject<Answer> = new BehaviorSubject(this.answer);
  public correctAnswer$: BehaviorSubject<Answer> = new BehaviorSubject(this.answer);
  public question$: BehaviorSubject<Question> = new BehaviorSubject(this.question);

  public resultSelected$: Subject<Result> = new Subject();
  public answerSelected$: Subject<Answer> = new Subject();
  public correctAnswerSelected$: Subject<Answer> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();

  private resultUrl = serverUrl + '/result';
  private questionUrl = serverUrl + '/:quizId/questions';

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

  // addQuiz(quiz: Quiz) {
  //   this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  // }
  //
  setSelectedResult(resultId: string) {
    const urlWithId = this.resultUrl + '/' + resultId;
    this.http.get<Result>(urlWithId).subscribe((result) => {
      this.resultSelected$.next(result);
    });
  }

  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = serverUrl + '/quizzes/' + quizId + '/questions/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  setSelectedAnswer(quizId: string, questionId: string, answerId: string) {
    const urlWithId = serverUrl + '/quizzes/' + quizId + '/questions/' + questionId + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.answerSelected$.next(answer);
    });
  }

  setSelectedCorrectAnswer(quizId: string, questionId: string, answerId: string) {
    const urlWithId = serverUrl + '/quizzes/' + quizId + '/questions/' + questionId + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.correctAnswerSelected$.next(answer);
    });
  }

  // deleteQuiz(quiz: Quiz) {
  //   const urlWithId = this.quizUrl + '/' + quiz.id;
  //   this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  // }
  //
  // addQuestion(quiz: Quiz, question: Question) {
  //   const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
  //   this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  // }
  //
  // deleteQuestion(quiz: Quiz, question: Question) {
  //   const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
  //   this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  // }

  /* Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.
  addQuestion(quiz: Quiz, question: Question) {
    quiz.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (index) {
      this.updateQuizzes(quiz, index);
    }
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const index = quiz.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quiz.questions.splice(index, 1)
      this.updateQuizzes(quiz, index);
    }
  }

  private updateQuizzes(quiz: Quiz, index: number) {
    this.quizzes[index] = quiz;
    this.quizzes$.next(this.quizzes);
  }
  */
}
