import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Settings} from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private settings: Settings;
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public settings$: BehaviorSubject<Settings> = new BehaviorSubject(this.settings);

  public settingsSelected$: Subject<Settings> = new Subject();

  private settingsUrl = serverUrl + '/settings';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setResultFromUrl();
  }

  setResultFromUrl() {
    this.http.get<Settings>(this.settingsUrl).subscribe((settings) => {
      this.settings = settings;
      this.settings$.next(this.settings);
    });
  }

  setSelectedSettings(userId: string) {
    const urlWithId = this.settingsUrl + '/' + userId;
    this.http.get<Settings>(urlWithId).subscribe((settings) => {
      console.log(settings);
      this.settingsSelected$.next(settings);
    });
  }

  updateSettings(settings: Settings, userId: string) {
    const questionUrl = this.settingsUrl + '/' + userId;
    this.http.put<Settings>(questionUrl, settings, this.httpOptions).subscribe();
  }

  resetSettings(settings: Settings, userId: string) {
    const questionUrl = this.settingsUrl + '/resetSettings/' + userId;
    this.http.put<Settings>(questionUrl, settings, this.httpOptions).subscribe();
  }
}
