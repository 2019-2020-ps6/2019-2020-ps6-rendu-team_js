import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = true;
  authLevel = 1;

  constructor() { }

  isAuth(): boolean {
    return this.auth;
  }

  getAuthLevel(): number {
    return this.authLevel;
  }
}
