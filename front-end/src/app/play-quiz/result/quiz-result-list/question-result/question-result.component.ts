import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../models/question.model';
import {Answer} from '../../../../../models/answer.model';

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

  @Input() isPair: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  isAnswerChosenCorrect(): boolean {
    return this.userAnswer.isCorrect;
  }
}
