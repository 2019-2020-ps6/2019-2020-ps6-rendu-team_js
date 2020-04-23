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
    if (this.settingsService.settings !== undefined && this.settingsService.settings !== null) {

      if (this.settingsService.settings.fontSize === 1) {
        document.getElementsByTagName('html')[0].style.setProperty('font-size', '5vmin');
      } else {
        document.getElementsByTagName('html')[0].style.setProperty('font-size', '9vmin');
      }

      if (this.settingsService.settings.contraste === 2) {
        document.getElementsByTagName('html')[0].style.setProperty('--headerBG', 'white');  //TODO CONSTRAST
      } else {
        document.getElementsByTagName('html')[0].style.setProperty('--headerBG', '#3D3D3D');
      }

    }
  }

}
