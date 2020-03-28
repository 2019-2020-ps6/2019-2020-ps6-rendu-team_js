import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/user.model';
import {Quiz} from '../models/quiz.model';
import {QUIZ_LIST} from '../mocks/quiz-list.mock';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from '../models/question.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {

    this.getLogin();
  }

  private authUrl = serverUrl + '/users';
  private loginPath = 'login';
  private logoutPath = 'logout';

  private httpOptions = httpOptionsBase;
  private ERROR_ACCOUNT_LEVEL = -1;
  private DEFAULT_RESIDENT_PASSWORD = 'resident';

  private user: User;
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);


  isAuth(): boolean {
    const auth = this.user != null && this.user.hasOwnProperty('username') && this.user.username !== '';
    return auth;
    // return this.user != null && this.user.username !== null &&  this.user.username !== '';
  }

  getAuthLevel(): number {
    if (this.isAuth()) {
      return this.user.accountLevel;
    }
    return this.ERROR_ACCOUNT_LEVEL;
  }

  loginResident(username: string) {
    const user = {
      username,
      password: this.DEFAULT_RESIDENT_PASSWORD,
    } as User;

    return this.login(user);
  }

  loginAdmin(username: string, password: string) {
    const user = {
      username,
      password,
    } as User;

    return this.login(user);
  }

  login(user: User) {
    return new Promise(
      ((resolve, reject) => {
        this.http.post<User>(this.authUrl + '/' + this.loginPath, user, httpOptionsBase).subscribe((u) => {

          this.user = u;
          this.user$.next(this.user);

          if (this.isAuth()) {
            this.router.navigate(['/quiz-list']);
            resolve('Connected');
          } else {
            console.log(u);
            resolve('Erreur : ' + JSON.parse(JSON.stringify(u)).errors);
          }

        });
      }));
  }

  getLogin() {
    return new Promise(
      ((resolve, reject) => {
        this.http.get(this.authUrl + '/' + this.loginPath, httpOptionsBase).subscribe((u) => {

          this.user = u as User;
          this.user$.next(this.user);

          if (this.isAuth()) {
            console.log(u);
            this.router.navigate(['/quiz-list']);
            resolve('Connected');
          } else {
            resolve('');
          }
        });
      }));
  }

  logout() {
    this.http.get(this.authUrl + '/' + this.logoutPath, httpOptionsBase).subscribe(() => {
      this.user = null;
      this.user$.next(this.user);
      this.router.navigate(['/welcome']);
    });
  }

}
