import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {GamesService} from '../../../services/games.service';
import {AuthService} from '../../../services/auth.service';
import {ToasterService} from '../../../services/toaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-inprogress',
  templateUrl: './quiz-inprogress.component.html',
  styleUrls: ['./quiz-inprogress.component.scss']
})
export class QuizInprogressComponent implements OnInit {

  private arrayQuizInfo: Quiz[];

  constructor(private route: ActivatedRoute,
              private gamesService: GamesService,
              private auth: AuthService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    const id = this.auth.user.id;

    this.gamesService.gameQuizInfoSelected$.subscribe((array) => this.arrayQuizInfo = array);
    this.gamesService.setSelectedGameQuizInfo(id.toString());
  }

  deleteGames() {
    const id = this.auth.user.id;

    Swal.fire({
      reverseButtons: true,
      icon: 'warning',
      title: 'Etes-vous sur de vouloir supprimer toutes les tentatives ?',
      confirmButtonText: 'Supprimer',
      confirmButtonColor: '#a20000',
      cancelButtonText: 'Retour',
      showCancelButton: true

    }).then((result) => {
      if (result.value) {
        this.gamesService.deleteGames(id.toString()).subscribe(response => {
          if (response.status === 204) {
            this.toasterService.activateToaster(false, 'Tous les essaie ont été supprimés !', 2000);
            this.gamesService.setSelectedGameQuizInfo(id.toString());
          } else {
            this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
          }
        });
      }
    });
  }
}
