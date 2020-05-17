import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {AuthService} from '../../../../services/auth.service';
import {GamesService} from '../../../../services/games.service';
import {Router} from '@angular/router';
import {Game} from '../../../../models/game.model';
import {ToasterService} from '../../../../services/toaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss']
})
export class QuizItemComponent implements OnInit {

  @Input() quiz: Quiz;

  private isFullyDisplayed = false;


  private themeColor: string;
  private lvlColor: string;
  private bgColor: string;

  constructor(private auth: AuthService,
              private gamesService: GamesService,
              private toasterService: ToasterService) {

  }

  ngOnInit() {
    this.themeColor = this.quiz.theme.color;
    this.bgColor = this.themeColor + '40';
    // tslint:disable-next-line:no-bitwise
    this.lvlColor = this.themeColor + 'D0';
  }

  deleteGame() {
    const id = this.auth.user.id;

    Swal.fire({
      reverseButtons: true,
      icon: 'warning',
      title: 'Etes-vous sur de vouloir supprimer cette tentative ?',
      confirmButtonText: 'Supprimer',
      confirmButtonColor: '#a20000',
      cancelButtonText: 'Retour',
      showCancelButton: true

    }).then((result) => {
      if (result.value) {
        this.gamesService.deleteGame(id.toString(), this.quiz.id.toString()).subscribe(response => {
          if (response.status === 204) {
            this.toasterService.activateToaster(false, 'Essaie supprimé !', 2000);
            this.gamesService.setSelectedGameQuizInfo(id.toString());
          } else {
            this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
          }
        });
      }
    });
  }

}
