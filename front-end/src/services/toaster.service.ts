import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private isErrorMessage: boolean;
  public isErrorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(this.isErrorMessage);


  private message: string;
  public message$: BehaviorSubject<string> = new BehaviorSubject(this.message);


  private timeMillisecond: number;
  public timeMillisecond$: BehaviorSubject<number> = new BehaviorSubject(this.timeMillisecond);


  constructor() {
  }

  activateToaster(isErrorMessage: boolean, message: string, ms: number) {
    this.isErrorMessage = isErrorMessage;
    this.message = message;
    this.timeMillisecond = ms;

    this.isErrorMessage$.next(this.isErrorMessage);
    this.message$.next(this.message);
    this.timeMillisecond$.next(this.timeMillisecond);
  }
}
