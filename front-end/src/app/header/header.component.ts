import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {HelpService} from '../../services/help.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHelpWindowDisplayed: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private helpService: HelpService,
              private location: Location) {
  }

  ngOnInit() {
    // this.authService.user$.subscribe((b: boolean) => { this.authService.auth = b; });
    this.helpService.windowDisplayed$.subscribe((b) => {
      this.isHelpWindowDisplayed = b;
    });
  }

  getCurrentPathSpliced(): string[] {
    return this.location.path().split('/');
  }

  logout() {

    Swal.fire({
      reverseButtons: true,
      icon: 'warning',
      title: 'Etes-vous sur de vouloir vous déconnecter ?',
      confirmButtonText: 'Se déconnecter',
      confirmButtonColor: '#a20000',
      cancelButtonText: 'Retour',
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.authService.logout();
        }
      });
  }

  quitQuiz() {

    Swal.fire({
      reverseButtons: true,
      icon: 'warning',
      title: 'Etes-vous sur de vouloir quitter le quiz ? \n(votre progression est enregistrée)',
      confirmButtonText: 'Quitter',
      confirmButtonColor: '#a20000',
      cancelButtonText: 'Retour',
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.router.navigate(['/quiz-list']);
        }
      });
  }

  displayHeader() {
    const path = this.getCurrentPathSpliced();
    return path.length > 0 && path[1] !== 'welcome';
  }

  isDisconnectDisplayed(): boolean {
    const path = this.getCurrentPathSpliced();
    return this.authService.isAuth() && path.length > 0 && path[1] !== 'play';
  }


  isPolyQuizDisplayed(): boolean {
    const path = this.getCurrentPathSpliced();
    return path.length > 0 && path[1] !== 'play';
  }


  isQuitDisplayed(): boolean {
    const path = this.getCurrentPathSpliced();
    return this.authService.isAuth() && path.length > 0 && path[1] === 'play';
  }

  isOnAdminLoginPage(): boolean {
    const path = this.getCurrentPathSpliced();
    return path.length > 2 && path[2] === 'admin';
  }

  helpButtonPressed() {
    this.isHelpWindowDisplayed = !this.isHelpWindowDisplayed;

    this.helpService.activateWindow(this.isHelpWindowDisplayed);

  }
}
