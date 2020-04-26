import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuardService {

  constructor(private router: Router,
              private settingsService: SettingsService,
              public authService: AuthService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise(((resolve, reject) => {

      if (this.authService.isAuth()) {
        this.settingsService.settings = undefined;
        this.settingsService.settings$.next(undefined);
        this.settingsService.settingsSelected$.next(undefined);
        console.log(this.settingsService.settings);
        resolve(true);

      } else {

        this.authService.getLogin().then(() => {
          if (this.authService.isAuth()) {
            reject();
            this.router.navigate(['/quiz-list']);
          } else {
            this.settingsService.settings = undefined;
            this.settingsService.settings$.next(undefined);
            this.settingsService.settingsSelected$.next(undefined);
            console.log(this.settingsService.settings);
            resolve(true);
          }

        });
      }
    }));

  }

}
