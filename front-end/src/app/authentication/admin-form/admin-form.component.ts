import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  public adminForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.adminForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  connexion() {
    this.authService.loginAdmin(this.adminForm.get('username').value, this.adminForm.get('password').value);
  }


}
