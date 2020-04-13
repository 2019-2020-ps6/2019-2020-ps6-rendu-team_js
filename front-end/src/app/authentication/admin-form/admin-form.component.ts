import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToasterService} from '../../../services/toaster.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  public adminForm: FormGroup;
  private isLoading: boolean;


  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.adminForm = this.formBuilder.group({
      username: ['admin', [Validators.required]],
      password: ['admin', [Validators.required]],
    });
  }


  connexion() {
    const username = this.adminForm.get('username').value;
    const password = this.adminForm.get('password').value;

    this.isLoading = true;
    this.authService.loginAdmin(username, password).then((callback) => {
      this.toasterService.activateToaster(true, callback.toString(), 3000);
      this.isLoading = false;
    });
  }


}
