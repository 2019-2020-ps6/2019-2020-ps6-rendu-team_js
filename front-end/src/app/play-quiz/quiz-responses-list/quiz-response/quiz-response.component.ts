import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../../../../models/question.model';

@Component({
  selector: 'app-quiz-response',
  templateUrl: './quiz-response.component.html',
  styleUrls: ['./quiz-response.component.scss']
})
export class QuizResponseComponent implements OnInit {

  @Input()
  public answer: Answer;

  constructor() { }

  ngOnInit() {
  }

}
