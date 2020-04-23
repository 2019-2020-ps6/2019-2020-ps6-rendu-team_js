import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {

  constructor(private router: Router,
              private settingsService: SettingsService,
              private authService: AuthService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise(((resolve, reject) => {

      if (this.authService.isAuth()) {
        if (this.authService.getAuthLevel() > 0) {
          resolve(true);
        } else {
          this.settingsService.setCurrentUserSettingsPromise().then((v) => {
            if (v === true) {
              reject();
              this.router.navigate(['/quiz-list']);
              console.log(this.settingsService.settings);
            } else {
              resolve(true);
            }
          });
        }

      } else {

        this.authService.getLogin().then(() => {
          if (this.authService.isAuth()) {
            if (this.authService.getAuthLevel() > 0) {
              this.settingsService.setCurrentUserSettingsPromise().then((v) => {
                if (v === true) {
                  resolve(true);
                  console.log(this.settingsService.settings);
                } else {
                  reject('no settings found');
                }
              });
            } else {
              reject();
              this.router.navigate(['/quiz-list']);
            }
          } else {
            reject();
            this.router.navigate(['/welcome']);
          }

        });
      }
    }));

  }
}
