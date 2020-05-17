import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user.model';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  private authUrl = serverUrl + '/users';
  private loginPath = 'login';
  private logoutPath = 'logout';
  private residentsPath = 'residents';

  private ERROR_ACCOUNT_LEVEL = -1;
  private DEFAULT_RESIDENT_PASSWORD = 'resident';

  private httpOptions = httpOptionsBase;

  public user: User;
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);


  isAuth(): boolean {
    return this.user != null && this.user.hasOwnProperty('username') && this.user.username !== '';
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
            resolve('');
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
            resolve('');
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

  createResidentAccount(firstName: string, lastName: string, assistanceVisuelle: boolean, assistanceMoteur: boolean) {
    return new Promise(
      ((resolve, reject) => {

        const userToCreate = {
          username: firstName + ' ' + lastName,
          firstName,
          lastName,
          password: this.DEFAULT_RESIDENT_PASSWORD,
          accountLevel: 0,
          assistanceVisuelle,
          assistanceMoteur
        };

        this.http.post<User>(this.authUrl + '/', userToCreate, httpOptionsBase).subscribe((u) => {
          const error = JSON.parse(JSON.stringify(u)).errors;
          if (error === '') {
            resolve('');
          }

          resolve('Erreur : ' + error);
        });
      }));
  }

  getResidents() {
    return this.http.get(this.authUrl + '/' + this.residentsPath, httpOptionsBase);
  }

  deleteResidentAccount(user: User) {
    const urlWithId = this.authUrl + '/' + user.id;
    return this.http.delete<User>(urlWithId, httpOptionsBase);
  }


  updateUserName(user: User, firstName: string, lastName: string) {
    const updateNameUrl = this.authUrl + '/updateName/' + user.id;
    user.firstName = firstName;
    user.lastName = lastName;
    return this.http.put<User>(updateNameUrl, user, {...this.httpOptions, observe: 'response'});
  }
}
