import {Component} from '@angular/core';
import {ToasterService} from '../services/toaster.service';

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

  constructor(private toasterService: ToasterService) {

    toasterService.isErrorMessage$.subscribe((isErrorMessage) => {
      this.isErrorMessage = isErrorMessage;
    });

    toasterService.message$.subscribe((message) => {
      this.message = message;
    });

    toasterService.timeMillisecond$.subscribe((timeMillisecond) => {
      return new Promise(resolve => {
        console.log(this.message);
        console.log(this.message !== '');
        setTimeout(resolve, timeMillisecond);
      }).then(() => {
        this.message = '';
        console.log(this.message !== '');
        console.log(this.message);
      });
    });
  }


  setBackgroundColor(color: string) {
    this.colorBackground = color;
  }

}
