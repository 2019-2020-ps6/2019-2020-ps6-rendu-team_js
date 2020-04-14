import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  private windowDisplayed: boolean;
  public windowDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject(this.windowDisplayed);

  constructor() {
  }

  activateWindow(b: boolean) {
    this.windowDisplayed = b;
    this.windowDisplayed$.next(this.windowDisplayed);
  }
}
