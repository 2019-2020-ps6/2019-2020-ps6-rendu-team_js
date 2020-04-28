import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../../../models/answer.model';
import {ToasterService} from '../../../services/toaster.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-question-creation',
    templateUrl: './question-creation.component.html',
    styleUrls: ['./question-creation.component.scss']
})
export class QuestionCreationComponent implements OnInit {

    @Input() question: Question;
    @Input() questionNumber: number;

    @Output()
    questionEmitter: EventEmitter<Question> = new EventEmitter<Question>();

    @Output()
    backPressedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    private isLoading = false;
    private questionName = '';
    private rightAnswer: Answer;
    private questionForm: FormGroup;
    private updateMode = false;

    private emptyRightAnswer = {
        value: '',
        id: -1,
        isCorrect: true,
    } as Answer;

    private emptyWrongAnswer = {
        value: '',
        isCorrect: false,
    } as Answer;

    constructor(private formBuilder: FormBuilder,
                private toasterService: ToasterService,
                private route: ActivatedRoute,
                private router: Router) {

      const id = this.route.snapshot.paramMap.get('id');

      console.log(id);

      if (id !== undefined && id !== null) {
        this.updateMode = true;
      }

    }

    private initializeAnswerForm() {
        this.questionForm = this.formBuilder.group({
            question: [this.questionName, [Validators.maxLength(100), Validators.required]],
            rightAnswer: [this.rightAnswer, [Validators.maxLength(50), Validators.required]],
            wrongAnswers: this.formBuilder.array([])
        });

        const answers = this.questionForm.get('wrongAnswers') as FormArray;

        if (this.question) {
            this.questionName = this.question.label;

            this.question.answers.forEach((a) => {
              if (a.deleted !== true) {
                if (a.isCorrect) {
                  this.rightAnswer = a;

                } else {
                  answers.push(this.createAnswer(a.value, a.id));
                }
              }
            });

        } else {
            this.rightAnswer = this.emptyRightAnswer;
            answers.push(this.createAnswer('', -1));
        }
    }

    ngOnInit() {
        // Form creation
        this.initializeAnswerForm();

    }

    get answers() {
        return this.questionForm.get('wrongAnswers') as FormArray;
    }

    private createAnswer(value: string, id: number) {
        return this.formBuilder.group({
            answer: [value, [Validators.maxLength(50), Validators.required]],
            answerId: id,
        });
    }


    addAnswer() {
        this.answers.push(this.createAnswer('', -1));
    }

    removeWrongAnswer(id: number) {
      const answerFind = this.answers.at(id).value;

      if (this.updateMode) {
        this.question.answers.forEach((answer) => {
          if (answer.id === answerFind.answerId) {
            answer.deleted = true;
            // console.log('ANSWER');
            // console.log(answer);
          }
        });
      }
      this.answers.removeAt(id);
    }

    addQuestion() {
        const formValues = this.questionForm.getRawValue();
        console.log(formValues);

        const answersArray: Answer[] = [];

        if (this.updateMode && this.question !== undefined) {
          formValues.wrongAnswers.forEach((r) => {
            if (r.answerId === -1) {
              if (r.answer !== '') {
                answersArray.push({
                  value: r.answer,
                  isCorrect: false,
                } as Answer);
              }
            } else {
              this.question.answers.forEach((ans) => {
                if ( ans.id === r.answerId) {
                  ans.value = r.answer;
                  if (r.deleted === true) {
                    ans.deleted = true;
                  }
                }
              });
            }
          });



        } else {
        const rightAnswer = {
          value: formValues.rightAnswer,
          isCorrect: true,
        } as Answer;

        answersArray.push(rightAnswer);


        formValues.wrongAnswers.forEach((r) => {
          if (r.answer.value !== '') {
            answersArray.push({
              value: r.answer,
              isCorrect: false,
            } as Answer);
          }
        });
      }


        // Check if enough answers to create the question, otherwise doesn't create it!
        if (!this.updateMode) {
          if (answersArray.length < 2) {
            this.toasterService.activateToaster(true, 'Entrer au moins une mauvaise réponse', 3000);
            return;
          }
        }

        let question;
        if (this.updateMode && this.question !== undefined) {
          this.question.label = formValues.question;
          this.question.answers = this.question.answers.concat(answersArray);
          question = this.question;
        } else {
          question = {
           label: formValues.question,
           answers: answersArray
          } as Question;
        }

        // console.log('QUESTIONS ANSW ANAT EMIT');
        // console.log(question.answers);

        this.questionEmitter.emit(question);

        if (this.questionForm.valid) {
        }
    }

    hasEnoughAnswers() {
        return this.answers.length > 1;
    }

    goToQuestionList() {
        this.backPressedEmitter.emit(this.hasOneQuestionAlreadyCreated());
    }

    hasOneQuestionAlreadyCreated(): boolean {
        return (this.question !== undefined) || (this.questionNumber > 1);
    }
}
