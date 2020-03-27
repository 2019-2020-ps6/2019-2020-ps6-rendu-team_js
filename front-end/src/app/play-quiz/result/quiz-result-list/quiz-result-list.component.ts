import {Component, Input, OnInit} from '@angular/core';
import {ResultQuestion} from '../../../../models/result.model';

@Component({
  selector: 'app-quiz-result-list',
  templateUrl: './quiz-result-list.component.html',
  styleUrls: ['./quiz-result-list.component.scss']
})
export class QuizResultListComponent implements OnInit {

  @Input() answers: ResultQuestion[];
  @Input() quizId: string;

  constructor() { }

  ngOnInit() {
  }

}
