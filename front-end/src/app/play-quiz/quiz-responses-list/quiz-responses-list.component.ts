import {Component, Input, OnInit} from '@angular/core';
import {Answer, Question} from '../../../models/question.model';

@Component({
  selector: 'app-quiz-responses-list',
  templateUrl: './quiz-responses-list.component.html',
  styleUrls: ['./quiz-responses-list.component.scss']
})
export class QuizResponsesListComponent implements OnInit {

  @Input()
  answers: Answer[];

  constructor() {}

  ngOnInit() {
  }

}
