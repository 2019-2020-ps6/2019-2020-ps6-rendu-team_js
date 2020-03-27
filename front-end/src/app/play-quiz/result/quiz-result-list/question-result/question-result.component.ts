import {Component, Input, OnInit} from '@angular/core';
import {Answer, Question} from '../../../../../models/question.model';

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.scss']
})
export class QuestionResultComponent implements OnInit {

  @Input() userAnswer: Answer;
  @Input() correctAnswer: Answer;
  @Input() questionScore: number;
  @Input() question: Question;
  @Input() index: number;

  constructor() {
  }

  ngOnInit() {
  }
}
