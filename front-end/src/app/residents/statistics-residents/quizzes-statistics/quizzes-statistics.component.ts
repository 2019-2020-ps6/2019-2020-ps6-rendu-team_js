import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Result} from '../../../../models/result.model';

@Component({
  selector: 'app-quiz-statistics',
  templateUrl: './quizzes-statistics.component.html',
  styleUrls: ['./quizzes-statistics.component.scss']
})
export class QuizzesStatisticsComponent implements OnInit {

  @Input() quizResult: Result;
  @Output() quizResultToDisplayDetails = new EventEmitter<number>();
  private isShow = false;

  constructor() { }

  ngOnInit() {
    console.log(this.quizResult);
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  quizToDisplayEvent($event) {
    this.quizResultToDisplayDetails.emit($event);
  }

}
