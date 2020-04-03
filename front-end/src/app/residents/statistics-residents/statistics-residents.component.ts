import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Statistics} from '../../../models/statistics.model';
import {ActivatedRoute} from '@angular/router';
import {StatisticsService} from '../../../services/statistics.service';
import {Result} from '../../../models/result.model';
import {ResultService} from '../../../services/result.service';

@Component({
  selector: 'app-statistics-residents',
  templateUrl: './statistics-residents.component.html',
  styleUrls: ['./statistics-residents.component.scss']
})
export class StatisticsResidentsComponent implements OnInit {

  emptyStats: Statistics = {
    currentWeek: 0,
    successPercentage: 0,
    totalQuizMade: 0,
    weekQuizMade: 0,
    perfectQuiz: 0,
    quizzesResultIds: [],
  };


  private userStatistics: Statistics = this.emptyStats;
  private quizResult: Result;

  private displayPerQuizComponent = true;
  private displayGlobalComponent: boolean;
  private displayQuizDetailsComponent = false;

  constructor(private route: ActivatedRoute, private statisticsService: StatisticsService, private resultService: ResultService) {
    this.statisticsService.statisticsSelected$.subscribe((statistics) => this.userStatistics = statistics);
    this.resultService.resultSelected$.subscribe((result) => this.quizResult = result);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.statisticsService.setSelectedStatistics(id);
  }

  displayQuizDetails($event) {
    this.resultService.setSelectedResult($event.toString());
    this.displayQuizDetailsComponent = true;
    this.displayPerQuizComponent = false;
    this.displayGlobalComponent = false;
  }

  displayGlobal() {
    if (!this.displayGlobalComponent) {
      this.displayQuizDetailsComponent = false;
      this.displayGlobalComponent = !this.displayGlobalComponent;
      this.displayPerQuizComponent = false;
    }
  }

  displayPerQuiz() {
    if (!this.displayPerQuizComponent) {
      this.displayQuizDetailsComponent = false;
      this.displayPerQuizComponent = !this.displayPerQuizComponent;
      this.displayGlobalComponent = false;
    }
  }
}
