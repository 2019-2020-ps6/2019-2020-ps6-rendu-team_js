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

  private themeColor: string;
  private lvlColor: string;
  private bgColor: string;


  constructor() { }

  ngOnInit() {
    this.themeColor = this.quizResult.theme.color;
    this.bgColor = this.themeColor + '40';
    // tslint:disable-next-line:no-bitwise
    this.lvlColor = this.themeColor + 'D0';
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  quizToDisplayEvent($event) {
    this.quizResultToDisplayDetails.emit($event);
  }

}
