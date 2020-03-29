import { Component, OnInit } from '@angular/core';
import {Statistics} from '../../../models/statistics.model';
import {ActivatedRoute} from '@angular/router';
import {StatisticsService} from '../../../services/statistics.service';

@Component({
  selector: 'app-statistics-residents',
  templateUrl: './statistics-residents.component.html',
  styleUrls: ['./statistics-residents.component.scss']
})
export class StatisticsResidentsComponent implements OnInit {

  private userStatistics: Statistics;

  constructor(private route: ActivatedRoute, private statisticsService: StatisticsService) {
    this.statisticsService.statisticsSelected$.subscribe((statistics) => this.userStatistics = statistics);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.statisticsService.setSelectedStatistics(id);
  }

}
