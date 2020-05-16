import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

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

  constructor(public location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.imagePath = 'assets/images/' + this.imageName;
  }


  goTo() {
    // tslint:disable-next-line:max-line-length
    if ((this.router.url.includes('/quiz-creation') || this.router.url.includes('/quiz-editor')) && confirm('Etes-vous sûr de vouloir retourner dans général, Attention votre création de quiz ne sera pas enregistrée ?')) {
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
