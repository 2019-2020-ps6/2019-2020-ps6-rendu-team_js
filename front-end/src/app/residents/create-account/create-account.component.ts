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
    {name: 'Visuelle', value: 'visuelle', id: 0, checked: false},
    {name: 'Motrice', value: 'motrice', id: 1, checked: false}
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
    console.log(this.getAssistanceValue());
  }

  changeState(id: number) {
    this.assistanceArray[id].checked = !this.assistanceArray[id].checked;
  }

  getAssistanceValue() {
    return this.assistanceArray.filter((v) => v.checked).map((item) => {
      return item.value;
    });

  }
}
