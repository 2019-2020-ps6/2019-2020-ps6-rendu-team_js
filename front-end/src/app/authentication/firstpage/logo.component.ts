import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationComponent} from '../authentication.component';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Output() displayAuthenticationFormEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  displayAuthenticationFields() {
    this.displayAuthenticationFormEvent.emit(true);
  }
}
