import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
              private router: Router) {
    this.userForm = new FormGroup({
      userIdentifiant: new FormControl()
    });
  }

  ngOnInit() {
  }

  connexion() {
    this.authService.auth$.next(true);
    // console.log('User connexion request :' + this.userForm.get('userIdentifiant').value);
    this.router.navigate(['/list-quiz']);
    console.log(this.authService.auth);
  }


}
