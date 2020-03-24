import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer, Question} from '../../../models/question.model';

@Component({
  selector: 'app-quiz-responses-list',
  templateUrl: './quiz-responses-list.component.html',
  styleUrls: ['./quiz-responses-list.component.scss']
})
export class QuizResponsesListComponent implements OnInit {

  @Input()
  answers: Answer[];

  @Output()
  answerSelected: EventEmitter<Answer> = new EventEmitter<Answer>();  // answer selected by user

  constructor() {}

  ngOnInit() {
  }

  submitAnswerOnClick(answer: Answer) {
    this.answerSelected.emit(answer);
  }

}
