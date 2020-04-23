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

}
