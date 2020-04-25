import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../../../models/answer.model';
import {ToasterService} from '../../../services/toaster.service';

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

    private emptyRightAnswer = {
        value: '',
        isCorrect: true,
    } as Answer;

    private emptyWrongAnswer = {
        value: '',
        isCorrect: false,
    } as Answer;

    constructor(private formBuilder: FormBuilder,
                private toasterService: ToasterService) {

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
        const formValues = this.questionForm.getRawValue();
        console.log(formValues);

        const answersArray: Answer[] = [];

        const rightAnswer = {
            value: formValues.rightAnswer,
            isCorrect: true,
        } as Answer;

        answersArray.push(rightAnswer);


        formValues.wrongAnswers.forEach((r) => {
            if (r.answer !== '') {
                answersArray.push({
                    value: r.answer,
                    isCorrect: false,
                } as Answer);
            }
        });


        // Check if enough answers to create the question, otherwise doesn't create it!
        if (answersArray.length < 2) {
            this.toasterService.activateToaster(true, 'Entrer au moins une mauvaise réponse', 3000);
            return;
        }

        const question = {
            label: formValues.question,
            answers: answersArray
        } as Question;

        console.log(question);

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
