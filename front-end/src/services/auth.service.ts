import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = true;
  auth$ = new BehaviorSubject<boolean>(this.auth);

  authLevel = 1;


  constructor() { }


  isAuth(): boolean {
    return this.auth;
  }

  getAuthLevel(): number {
    return this.authLevel;
  }
}
