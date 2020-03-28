import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  connexion() {
    const username = this.userForm.get('username').value;
    this.authService.loginResident(username);
  }


}
