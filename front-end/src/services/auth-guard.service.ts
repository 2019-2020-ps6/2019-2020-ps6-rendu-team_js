import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,
              public authService: AuthService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise(((resolve, reject) => {

      if (this.authService.isAuth()) {
        resolve(true);

      } else {

        this.authService.getLogin().then(() => {
          if (this.authService.isAuth()) {
            resolve(true);
          } else {
            reject();
            this.router.navigate(['/welcome']);
          }

        });
      }
    }));

  }
}
