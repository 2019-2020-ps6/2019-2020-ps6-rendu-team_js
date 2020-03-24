import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  public adminForm: FormGroup;

  constructor() {
    this.adminForm = new FormGroup({
      userIdentifiant: new FormControl(),
      userPassword: new FormControl()
    });
  }

  ngOnInit() {
  }

  connexion() {
    console.log('Admin connexion request :' + this.adminForm.get('userIdentifiant').value + ' ' + this.adminForm.get('userPassword').value);
  }


}
