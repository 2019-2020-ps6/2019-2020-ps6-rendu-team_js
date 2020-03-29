import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../../../../models/result.model';

@Component({
  selector: 'app-quiz-statistics-adminside',
  templateUrl: './quiz-statistics.component.html',
  styleUrls: ['./quiz-statistics.component.scss']
})
export class QuizStatisticsComponent implements OnInit {

  @Input() try: Result;
  private datePreFormat: Date;

  constructor() { }

  ngOnInit() {
    this.datePreFormat = new Date(this.try.date);
  }

}
