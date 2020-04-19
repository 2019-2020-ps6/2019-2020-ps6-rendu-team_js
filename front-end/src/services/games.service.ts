import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Quiz} from '../models/quiz.model';
import {Game} from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private gameQuizInfo: Quiz[];
  private gameInfo: Game;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public gameInfo$: BehaviorSubject<Game> = new BehaviorSubject(this.gameInfo);
  public gameInfoSelected$: Subject<Game> = new Subject();

  public gameQuizInfo$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.gameQuizInfo);
  public gameQuizInfoSelected$: Subject<Quiz[]> = new Subject();

  private gamesUrl = serverUrl + '/games';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setGameQuizInfoFromUrl();
    this.setGameInfoFromUrl();
  }

  getGameFromQuiz(userId: number, quizId: number) {
    const url = this.gamesUrl + '/' + userId + '/' + quizId;
    return this.http.get<Game>(url);
  }

  setGameQuizInfoFromUrl() {
    this.http.get<Quiz[]>(this.gamesUrl).subscribe((gameQuizInfo) => {
      this.gameQuizInfo = gameQuizInfo;
      this.gameQuizInfo$.next(this.gameQuizInfo);
    });
  }

  setGameInfoFromUrl() {
    this.http.get<Game>(this.gamesUrl).subscribe((gameInfo) => {
      this.gameInfo = gameInfo;
      this.gameInfo$.next(this.gameInfo);
    });
  }

  setSelectedGameQuizInfo(userId: string) {
    const urlWithId = this.gamesUrl + '/' + userId;
    this.http.get<Quiz[]>(urlWithId).subscribe((result) => {
      this.gameQuizInfoSelected$.next(result);
    });
  }

  deleteGames(userId: string) {
    const urlWithId = this.gamesUrl + '/' + userId;
    return this.http.delete<Game>(urlWithId, {...this.httpOptions, observe: 'response'});
  }

  deleteGame(userId: string, quizId: string) {
    const urlWithId = this.gamesUrl + '/' + userId + '/' + quizId;
    return this.http.delete<Game>(urlWithId, {...this.httpOptions, observe: 'response'});
  }

  setSelectedGameInfo(userId: string, quizId: string) {
    const urlWithId = this.gamesUrl + '/' + userId + '/' + quizId;
    this.http.get<Game>(urlWithId).subscribe((result) => {
      this.gameInfoSelected$.next(result);
    });
  }

  // addResult(answer: object) {
  //   this.http.post<number>(this.resultUrl, answer, this.httpOptions).subscribe((resultId: number) => {
  //     this.resultIdSelected$.next(resultId);
  //   });
  // }
}
