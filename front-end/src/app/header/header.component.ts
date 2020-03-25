import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.authService.auth$.subscribe((b: boolean) => { this.authService.auth = b; });
  }

  logout() {
    this.authService.auth$.next(false);
    this.router.navigate(['/welcome']);
  }

  quitQuiz() {
    this.router.navigate(['/quiz-list']);
  }

  displayHeader() {
    const path = this.location.path().split('/');
    return path.length > 0 && path[1] !== 'welcome';
  }

  isDisconnectDisplayed() {
    const path = this.location.path().split('/');
    return this.authService.isAuth() && path.length > 0 && path[1] !== 'play' ;
  }


  isPolyQuizDisplayed() {
    const path = this.location.path().split('/');
    return path.length > 0 && path[1] !== 'play' ;
  }


  isQuitDisplayed() {
    const path = this.location.path().split('/');
    return this.authService.isAuth() && path.length > 0 && path[1] === 'play';
  }



}
