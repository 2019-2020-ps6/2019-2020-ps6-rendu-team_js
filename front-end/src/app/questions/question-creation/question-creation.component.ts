import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-question-creation',
  templateUrl: './question-creation.component.html',
  styleUrls: ['./question-creation.component.scss']
})
export class QuestionCreationComponent implements OnInit {

  @Input() question: Question;
  private isLoading = false;
  public questionForm: FormGroup;
  public addreponse = 0;

  constructor(private formBuilder: FormBuilder) {

    this.questionForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      reponse: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  addReponse() {
    this.addreponse++;
  }
}
