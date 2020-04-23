import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {Settings} from '../models/settings.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings: Settings;

  public settings$: BehaviorSubject<Settings> = new BehaviorSubject(this.settings);

  public settingsSelected$: Subject<Settings> = new Subject();

  private settingsUrl = serverUrl + '/settings';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient,
              private authServices: AuthService) {  }

  setCurrentUserSettings() {
    if (this.authServices.user !== undefined && this.authServices.user !== null) {
      const uid = this.authServices.user.id;

      const urlWithId = this.settingsUrl + '/' + uid;

      this.http.get<Settings>(urlWithId).subscribe((settings) => {
        this.settings = settings;
        this.settings$.next(this.settings);
      });
    }
  }

  setCurrentUserSettingsPromise() {
    return new Promise((resolve, reject) => {

      if (this.settings !== undefined) {
        return resolve(true);
      }

      if (this.authServices.user != null) {
        const uid = this.authServices.user.id;

        const urlWithId = this.settingsUrl + '/' + uid;

        this.http.get<Settings>(urlWithId).subscribe((settings) => {
          this.settings = settings;
          this.settings$.next(this.settings);
          resolve(true);
        });

      } else {
        resolve(false);
      }
    });
  }

  setSelectedSettings(userId: string) {
    const urlWithId = this.settingsUrl + '/' + userId;
    this.http.get<Settings>(urlWithId).subscribe((settings) => {
      console.log(settings);
      this.settingsSelected$.next(settings);
    });
  }

  // getUserSettings(userId: number) {
  //   const urlWithId = this.settingsUrl + '/' + userId;
  //   this.http.get<Settings>(urlWithId).subscribe((settings) => {
  //     console.log(settings);
  //     return settings;
  //   });
  // }

  updateSettings(settings: Settings, userId: string) {
    const url = this.settingsUrl + '/' + userId;
    return this.http.put<Settings>(url, settings, {...this.httpOptions, observe: 'response'});
  }

  resetSettings(settings: Settings, userId: string) {
    const url = this.settingsUrl + '/resetSettings/' + userId;
    return this.http.put(url, settings, {...this.httpOptions, observe: 'response'});
  }

  modifyBaseSettings(settings: Settings, userId: string): Observable<HttpResponse<any>> {
    const url = this.settingsUrl + '/resetSettings/' + userId;
    return this.http.put(url, settings, {...this.httpOptions, observe: 'response'});

  }

  copyUserSettingsToOtherAccounts(userId: string, usersId: string[]): Observable<HttpResponse<any>> {
    const url = this.settingsUrl + '/copySettings/' + userId;
    return this.http.put(url, usersId, {...this.httpOptions, observe: 'response'});

  }

  // ------------------ play quiz ---------------------

  isSelectionHigh() {
    if (this.settings !== undefined) {
      return this.settings.tailleSelection !== 1;
    }

    return true;
  }

  isFontHigh() {
    if (this.settings !== undefined) {
      return this.settings.fontSize !== 1;
    }

    return true;
  }

}
