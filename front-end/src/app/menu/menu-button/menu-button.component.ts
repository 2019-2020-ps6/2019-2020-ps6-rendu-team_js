import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {QuizCreationStatusService} from '../../../services/quiz-creation-status.service';

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
    if (this.isQuizCreationPageEmpty || ((this.router.url.includes('/quiz-creation') || this.router.url.includes('/quiz-editor')) && confirm('Attention votre création/édition de quiz n\'est enregistrée !\nEtes-vous sûr de vouloir changer de page ?'))) {
      if (this.routerPath !== '') {
        const pathsDisplayed = this.routerPath.split(' ');
        this.router.navigate([pathsDisplayed[0]]);
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
