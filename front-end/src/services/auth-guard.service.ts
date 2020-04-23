import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,
              private settingsService: SettingsService,
              private authService: AuthService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise(((resolve, reject) => {

      // TODO check if a cookie exist before asking the server

      if (this.authService.isAuth()) {
        this.settingsService.setCurrentUserSettingsPromise().then((v) => {
          if (v === true) {
            resolve(true);
            console.log(this.settingsService.settings);
          } else {
            reject('no settings found');
          }
        });
        resolve(true);

      } else {

        this.authService.getLogin().then(() => {
          if (this.authService.isAuth()) {
            this.settingsService.setCurrentUserSettingsPromise().then((v) => {
              if (v === true) {
                resolve(true);
                console.log(this.settingsService.settings);
              } else {
                reject('no settings found');
              }
            });
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
