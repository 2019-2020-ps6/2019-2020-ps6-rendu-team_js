import { Component, OnInit } from '@angular/core';
import { Statistics } from '../../models/statistics.model';
import {ActivatedRoute} from '@angular/router';
import {StatisticsService} from '../../services/statistics.service';

@Component({
  selector: 'app-stats',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  private userStatistics: Statistics;

  constructor(private route: ActivatedRoute, private statisticsService: StatisticsService) {
    this.statisticsService.statisticsSelected$.subscribe((statistics) => this.userStatistics = statistics);
  }

  ngOnInit() {
    const id = '1000000001'; // TODO USER ID TO REPLACE IN FUTURE
    this.statisticsService.setSelectedStatistics(id);
    console.log(this.userStatistics);
  }

}
