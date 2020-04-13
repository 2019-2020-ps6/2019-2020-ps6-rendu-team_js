import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToasterService} from '../../../services/toaster.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;
  private isLoading: boolean;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: ['John Doe', [Validators.required]]
    });
  }

  connexion() {
    const username = this.userForm.get('username').value;

    this.isLoading = true;
    this.authService.loginResident(username).then((callback) => {
      this.toasterService.activateToaster(true, callback.toString(), 3000);
      this.isLoading = false;
    });

  }


}
