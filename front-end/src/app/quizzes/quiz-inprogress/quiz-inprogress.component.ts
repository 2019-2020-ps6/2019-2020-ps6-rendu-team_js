import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {GamesService} from '../../../services/games.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-quiz-inprogress',
  templateUrl: './quiz-inprogress.component.html',
  styleUrls: ['./quiz-inprogress.component.scss']
})
export class QuizInprogressComponent implements OnInit {

  private arrayQuizInfo: Quiz[];

  constructor(private route: ActivatedRoute, private gamesService: GamesService, private auth: AuthService) {
  }

  ngOnInit() {
    const id = this.auth.user.id;

    this.gamesService.gameQuizInfoSelected$.subscribe((array) => this.arrayQuizInfo = array);
    this.gamesService.setSelectedGameQuizInfo(id.toString());
  }

  deleteGames() {
    const id = this.auth.user.id;
    this.gamesService.deleteGames(id.toString());
  }
}
