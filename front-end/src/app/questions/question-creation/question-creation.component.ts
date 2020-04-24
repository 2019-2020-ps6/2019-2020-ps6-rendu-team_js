import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../../../models/answer.model';

@Component({
  selector: 'app-question-creation',
  templateUrl: './question-creation.component.html',
  styleUrls: ['./question-creation.component.scss']
})
export class QuestionCreationComponent implements OnInit {

  @Input() question: Question;
  @Input() questionNumber: number;


  private isLoading = false;
  private questionName = '';
  private rightAnswer: Answer;
  private questionForm: FormGroup;

  private emptyRightAnswer = {
    value: '',
    isCorrect: true,
  } as Answer;

  private emptyWrongAnswer = {
    value: '',
    isCorrect: false,
  } as Answer;

  constructor(public formBuilder: FormBuilder) {

  }

  private initializeAnswerForm() {


    this.questionForm = this.formBuilder.group({
      question: [this.questionName, Validators.required],
      rightAnswer: [this.rightAnswer, Validators.required],
      wrongAnswers: this.formBuilder.array([])
    });

    const answers = this.questionForm.get('wrongAnswers') as FormArray;

    if (this.question) {
      this.questionName = this.question.label;

      this.question.answers.forEach((a) => {
        if (a.isCorrect) {
          this.rightAnswer = a;

        } else {
          answers.push(this.createAnswer(a.value));
        }
      });
    } else {
      this.rightAnswer = this.emptyRightAnswer;
      answers.push(this.createAnswer(''));
    }
  }

  ngOnInit() {
    // Form creation
    this.initializeAnswerForm();

  }

  get answers() {
    return this.questionForm.get('wrongAnswers') as FormArray;
  }

  private createAnswer(value: string) {
    return this.formBuilder.group({
      answer: value,
    });
  }


  addAnswer() {
    this.answers.push(this.createAnswer(''));
  }

  removeWrongAnswer(id: number) {
    this.answers.removeAt(id);
  }

  addQuestion() {
    const answer = this.questionForm.getRawValue();
    console.log(answer);
    if (this.questionForm.valid) {
      // this.initializeAnswerForm();
    }
  }

  hasEnoughAnswers() {
    return this.answers.length > 1;
  }
}
