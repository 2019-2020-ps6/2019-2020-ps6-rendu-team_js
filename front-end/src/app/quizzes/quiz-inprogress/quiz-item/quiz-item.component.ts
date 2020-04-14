import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {AuthService} from '../../../../services/auth.service';
import {GamesService} from '../../../../services/games.service';
import {Router} from '@angular/router';
import {Game} from '../../../../models/game.model';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss']
})
export class QuizItemComponent implements OnInit {

  @Input() quiz: Quiz;

  private deleted = false;
  private isFullyDisplayed = false;

  constructor(private auth: AuthService, private gamesService: GamesService, private router: Router) {

  }

  ngOnInit() {
  }

  deleteGame() {
    const id = this.auth.user.id;

    this.gamesService.deleteGame(id.toString(), this.quiz.id).subscribe(() => {
      this.deleted = true;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/themes']));
    });
  }

}
