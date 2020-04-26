import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Answer} from '../../../models/answer.model';

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

  color1 = 'var(--customGreen)';
  color2 = 'var(--customBlue)';
  color3 = 'var(--customOrange)';
  color4 = 'var(--customPlayPink)';

  colors = [this.color1, this.color2, this.color3, this.color4];

  constructor() {}

  ngOnInit() {
    console.log(this.colors);
  }

  submitAnswerOnClick(answer: Answer) {
    this.answerSelected.emit(answer);
  }

}
