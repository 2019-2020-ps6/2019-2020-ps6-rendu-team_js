import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-global-statistics',
  templateUrl: './global-statistics.component.html',
  styleUrls: ['./global-statistics.component.scss']
})
export class GlobalStatisticsComponent implements OnInit {

  @Input() totalQuizMade: number;
  @Input() weekQuizMade: number;
  @Input() successPercentage: number;
  @Input() perfectQuizMade: number;

  constructor() { }

  ngOnInit() {
  }

}
