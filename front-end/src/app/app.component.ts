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

      if (this.settingsService.settings.contraste !== undefined && this.settingsService.settings.contraste === 2) {
        document.getElementsByTagName('html')[0].style.setProperty('--customWhite', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customGray', '#363636');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkGray', 'black');
        document.getElementsByTagName('html')[0].style.setProperty('--customRed', '#650000');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkRed', '#650000');
        document.getElementsByTagName('html')[0].style.setProperty('--customGreen', '#0B4F00');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkGreen', '#0B4F00');
        document.getElementsByTagName('html')[0].style.setProperty('--customExtraDarkBlue', 'black');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkBlue', '#001547');
        document.getElementsByTagName('html')[0].style.setProperty('--customBlue', '#005B72');
        document.getElementsByTagName('html')[0].style.setProperty('--customLiteBlue', '#f2f2f2');
        document.getElementsByTagName('html')[0].style.setProperty('--customOrange', '#724100');
        document.getElementsByTagName('html')[0].style.setProperty('--customLiteOrange', 'rgba(252,220,97,0.5)');
        document.getElementsByTagName('html')[0].style.setProperty('--customPurple', '#44004C');
      } else {
        document.getElementsByTagName('html')[0].style.setProperty('--customWhite', 'white');
        document.getElementsByTagName('html')[0].style.setProperty('--customGray', '#3d3d3d');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkGray', '#2a2a2a');
        document.getElementsByTagName('html')[0].style.setProperty('--customRed', '#de5252');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkRed', '#8d0000');
        document.getElementsByTagName('html')[0].style.setProperty('--customGreen', '#65a800');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkGreen', '#0c6600');
        document.getElementsByTagName('html')[0].style.setProperty('--customDarkBlue', '#0058ca');
        document.getElementsByTagName('html')[0].style.setProperty('--customExtraDarkBlue', '#2B7FD8');
        document.getElementsByTagName('html')[0].style.setProperty('--customBlue', '#2B7FD8');
        document.getElementsByTagName('html')[0].style.setProperty('--customLiteBlue', 'rgba(48, 152, 249, 0.14)');
        document.getElementsByTagName('html')[0].style.setProperty('--customOrange', '#dca409');
        document.getElementsByTagName('html')[0].style.setProperty('--customLiteOrange', 'rgba(255, 213, 52, 0.76)');
        document.getElementsByTagName('html')[0].style.setProperty('--customPurple', 'blueviolet');
      }
  }

}
