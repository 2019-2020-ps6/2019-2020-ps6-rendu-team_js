import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  displayAuthenticationForm = false;
  displayUserForm = true; // False mean user form

  constructor() { }

  ngOnInit() {
  }

  receiveDisplayAuthenticationFormEvent($event) {
    this.displayAuthenticationForm = $event;
  }

  receiveDisplayUserFormEvent() {
    this.displayUserForm = true;
  }

  receiveDisplayAdminFormEvent() {
    this.displayUserForm = false;
  }

}
