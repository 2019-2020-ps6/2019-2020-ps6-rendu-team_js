import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'polyquiz';
  colorBackground: string;

  constructor(public location: Location) {
  }

  setBackgroundColor(color: string) {
    this.colorBackground = color;
  }
}
