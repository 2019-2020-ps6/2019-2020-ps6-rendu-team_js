import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {Theme} from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private themes: Theme[];
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public themeSelected$: Subject<Theme> = new Subject();

  private themeUrl = serverUrl + '/theme';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setThemes();
  }

  addTheme(theme: Theme) {
    this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => {
      this.themes.push(theme);
      this.themes$.next(this.themes);
    });
  }

  setThemes() {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themes) => {
      this.themes = themes;
      this.themes$.next(this.themes);
    });
  }

  setThemeSelectedFromId(themeId: string) {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      console.log(theme);
      this.themeSelected$.next(theme);
    });
  }

  getThemeSelectedFromId(themeId: string) {
    const urlWithId = this.themeUrl + '/' + themeId;
    return this.http.get<Theme>(urlWithId);
  }


  increaseThemeQuizNumber(theme: Theme, themeId: string): Observable<HttpResponse<any>> {
    const url = this.themeUrl + '/' + themeId + '/increase';
    theme.nbQuiz++;
    return this.http.put(url, theme, {...this.httpOptions, observe: 'response'});
  }

  decreaseThemeQuizNumber(theme: Theme, themeId: string): Observable<HttpResponse<any>> {
    const url = this.themeUrl + '/' + themeId + '/decrease';
    theme.nbQuiz--;
    return this.http.put(url, theme, {...this.httpOptions, observe: 'response'});
  }
}
