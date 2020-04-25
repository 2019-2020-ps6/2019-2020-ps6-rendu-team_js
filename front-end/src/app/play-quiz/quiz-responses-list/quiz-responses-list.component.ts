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

  color1 = 'var(--customOrange)';
  color2 = 'var(--customPlayPink)';
  color3 = 'var(--customGreen)';
  color4 = 'var(--customBlue)';

  colors = [this.color1, this.color2, this.color3, this.color4];

  constructor() {}

  ngOnInit() {
    console.log(this.colors);
  }

  submitAnswerOnClick(answer: Answer) {
    this.answerSelected.emit(answer);
  }

}
