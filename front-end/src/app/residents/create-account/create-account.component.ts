import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Answer} from '../../../models/question.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  assistanceArray = [
    {name: 'Visuelle', value: 'visuelle', checked: false},
    {name: 'Motrice', value: 'motrice', checked: false}
  ];


  public createForm: FormGroup;
  private error: string;
  private isLoading: boolean;

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();




  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      myChoices: new FormArray([]),
    });
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }

  createPressed() {
    const firstName = this.createForm.get('firstName').value;
    const lastName = this.createForm.get('lastName').value;

    console.log(firstName + ' ' + lastName);
  }
}
