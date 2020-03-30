import {Component, OnInit} from '@angular/core';
import {Statistics} from '../../models/statistics.model';
import {ActivatedRoute} from '@angular/router';
import {StatisticsService} from '../../services/statistics.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-stats',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    private userStatistics: Statistics;

    constructor(private route: ActivatedRoute, private statisticsService: StatisticsService, private auth: AuthService) {
        this.statisticsService.statisticsSelected$.subscribe((statistics) => this.userStatistics = statistics);
    }

    ngOnInit() {
        const id = this.auth.user.id;
        this.statisticsService.setSelectedStatistics(id);
    }

}
