import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Output() displayAdminFormEvent = new EventEmitter<void>();

  public userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      userIdentifiant: new FormControl()
    });
  }

  ngOnInit() {
  }

  connexion() {
    console.log('User connexion request :' + this.userForm.get('userIdentifiant').value);
  }

  displayAdminForm() {
    this.displayAdminFormEvent.emit();
  }

}
