import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Statistics} from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private statistics: Statistics;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public statistics$: BehaviorSubject<Statistics> = new BehaviorSubject(this.statistics);

  public statisticsSelected$: Subject<Statistics> = new Subject();

  private statisticsUrl = serverUrl + '/statistics';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setStatisticsFromUrl();
  }

  setStatisticsFromUrl() {
    this.http.get<Statistics>(this.statisticsUrl).subscribe((statistics) => {
      this.statistics = statistics;
      this.statistics$.next(this.statistics);
    });
  }

  setSelectedStatistics(resultId: string) {
    const urlWithId = this.statisticsUrl + '/' + resultId;
    this.http.get<Statistics>(urlWithId).subscribe((statistics) => {
      this.statisticsSelected$.next(statistics);
    });
  }
}
