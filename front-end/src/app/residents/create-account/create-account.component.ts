import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToasterService} from '../../../services/toaster.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  assistanceArray = [
    {name: 'Visuelle', value: 'visuelle', id: 0, checked: false},
    {name: 'Motrice', value: 'motrice', id: 1, checked: false}
  ];


  public createForm: FormGroup;
  // private error: string;
  private error: string;
  private isLoading: boolean;

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  isAccountCreated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
              private toasterService: ToasterService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      assistanceArray: new FormArray([]),
    });
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }


  createPressed() {
    const firstName = this.createForm.get('firstName').value;
    const lastName = this.createForm.get('lastName').value;

    console.log(firstName + ' ' + lastName);
    this.isLoading = true;

    this.authService.createResidentAccount(firstName, lastName, this.getAssistanceVisuelle(), this.getAssistanceMoteur())
      .then((callback) => {

        if (callback.toString() === '') {
          console.log('got here');
          this.toasterService.activateToaster(false, 'Compte créé !', 2000);

          this.isAccountCreated.emit(true);
          this.backPressed();
          return;
        }

        this.toasterService.activateToaster(true, callback.toString(), 3000);
        this.isLoading = false;
      });
  }

  changeState(id: number) {
    this.assistanceArray[id].checked = !this.assistanceArray[id].checked;
  }

  getAssistanceVisuelle() {
    return this.assistanceArray[0].checked;
  }

  getAssistanceMoteur() {
    return this.assistanceArray[1].checked;
  }


}
