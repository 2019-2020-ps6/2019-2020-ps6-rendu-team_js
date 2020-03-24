import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,
              public authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {

        console.log(this.authService.auth);

        if (this.authService.auth) {
          resolve(true);
        } else {
          this.router.navigate(['/login/user']);
          resolve(false);
        }
      }
    );
  }

}
