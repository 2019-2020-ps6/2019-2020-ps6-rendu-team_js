import {Component} from '@angular/core';
import {ToasterService} from '../services/toaster.service';
import {HelpService} from '../services/help.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colorBackground: string;

  isHelpActive = false;

  private isErrorMessage: boolean;
  private message: string;

  constructor(private toasterService: ToasterService,
              private helpService: HelpService,
              private settingsService: SettingsService) {

    /* TOASTER */
    toasterService.isErrorMessage$.subscribe((isErrorMessage) => {
      this.isErrorMessage = isErrorMessage;
    });

    toasterService.message$.subscribe((message) => {
      this.message = message;
    });

    toasterService.timeMillisecond$.subscribe((timeMillisecond) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeMillisecond);
      }).then(() => {
        this.message = '';
      });
    });

    /* HELP */
    this.helpService.windowDisplayed$.subscribe((b) => {
      this.isHelpActive = b;
    });

  }


  setBackgroundColor(color: string) {
    this.colorBackground = color;
  }

  applyCssFromSettings() {
      if (this.settingsService.settings.fontSize === 1) {
        document.getElementsByTagName('html')[0].style.setProperty('font-size', '5vmin');
      } else {
        document.getElementsByTagName('html')[0].style.setProperty('font-size', '9vmin');
      }

      if (this.settingsService.settings.contraste === 2) {
        document.getElementsByTagName('html')[0].style.setProperty('--customWhite', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customGray', '#363636');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkGray', 'black');
        document.getElementsByTagName('html')[0].style.setProperty('--customRed', '#650000');
        document.getElementsByTagName('html')[0].style.setProperty('--customGreen', '#0B4F00');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkBlue', '#001547');
        document.getElementsByTagName('html')[0].style.setProperty('--customBlue', '#005B72');
        document.getElementsByTagName('html')[0].style.setProperty('--customOrange', '#724100');
        document.getElementsByTagName('html')[0].style.setProperty('--customPurple', '#44004C');
      } else {
        document.getElementsByTagName('html')[0].style.setProperty('--customWhite', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customGray', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkGray', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customRed', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customGreen', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkBlue', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customBlue', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customOrange', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customPurple', 'white');
      }
  }

}
