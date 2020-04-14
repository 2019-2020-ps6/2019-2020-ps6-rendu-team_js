import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {AuthService} from '../../../../services/auth.service';
import {GamesService} from '../../../../services/games.service';
import {Router} from '@angular/router';
import {Game} from '../../../../models/game.model';
import {ToasterService} from '../../../../services/toaster.service';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss']
})
export class QuizItemComponent implements OnInit {

  @Input() quiz: Quiz;

  private isFullyDisplayed = false;

  constructor(private auth: AuthService,
              private gamesService: GamesService,
              private toasterService: ToasterService,
              private router: Router) {

  }

  ngOnInit() {
  }

  deleteGame() {
    const id = this.auth.user.id;

    this.gamesService.deleteGame(id.toString(), this.quiz.id).subscribe(() => {
      this.toasterService.activateToaster(false, 'Essaie supprimé !', 2000);
      this.gamesService.setSelectedGameQuizInfo(id);
    });
  }

}
