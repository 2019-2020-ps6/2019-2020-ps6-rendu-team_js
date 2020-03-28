import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuardService {

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
            reject();
            this.router.navigate(['/quiz-list']);
          } else {
            resolve(true);
          }

        });
      }
    }));

  }

}
