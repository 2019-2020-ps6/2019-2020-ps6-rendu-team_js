import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {QuizCreationStatusService} from '../../../services/quiz-creation-status.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {

  @Input() name: string;
  @Input() imageName: string;
  @Input() routerPath: string;
  @Input() bgColor: string;

  imagePath: string;
  isQuizCreationPageEmpty = true;

  constructor(private location: Location,
              private quizCreationStatusService: QuizCreationStatusService,
              private router: Router) {
    quizCreationStatusService.isQuizCreatedEmpty$.subscribe((b) => {
      this.isQuizCreationPageEmpty = b;
    });
  }

  ngOnInit() {
    this.imagePath = 'assets/images/' + this.imageName;
  }


  goTo() {
    // tslint:disable-next-line:max-line-length
    if (((this.router.url.includes('/quiz-creation') || this.router.url.includes('/quiz-editor')))) {
      if (!this.isQuizCreationPageEmpty) {
        Swal.fire({
          reverseButtons: true,
          icon: 'warning',
          title: 'Attention si votre quiz n\'est pas créé ou mis à jour il ne sera pas enregistré !\nEtes-vous sûr de vouloir quitter ?',
          confirmButtonText: 'Quitter',
          confirmButtonColor: '#a20000',
          cancelButtonText: 'Retour',
          showCancelButton: true
        })
          .then((result) => {
            if (result.value) {
              this.isQuizCreationPageEmpty = false;

              if (this.routerPath !== '') {
                const pathsDisplayed = this.routerPath.split(' ');
                this.router.navigate([pathsDisplayed[0]]);
              }

            }
          });
      } else {
        if (this.routerPath !== '') {
          const pathsDisplayed = this.routerPath.split(' ');
          this.router.navigate([pathsDisplayed[0]]);
        }
      }
    } else if ((!this.router.url.includes('/quiz-creation') && !this.router.url.includes('/quiz-editor'))) {
      if (this.routerPath !== '') {
        const pathsDisplayed = this.routerPath.split(' ');
        this.router.navigate([pathsDisplayed[0]]);
      }
    }
  }

  isArrowDisplayed() {
    const pathsDisplayed = this.routerPath.split(' ');
    const path = this.location.path().split('/');

    if (path.length <= 1) {
      return false;
    }

    let isDisplayed = false;

    pathsDisplayed.forEach((s) => {
      if (path[1] === s) {
        isDisplayed = true;
      }
    });

    return isDisplayed;
  }
}
