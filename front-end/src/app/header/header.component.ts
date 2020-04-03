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
    // this.authService.user$.subscribe((b: boolean) => { this.authService.auth = b; });
  }

  getCurrentPathSpliced(): string[] {
    return this.location.path().split('/');
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/welcome']);
  }

  quitQuiz() {
    this.router.navigate(['/quiz-list']);
  }

  displayHeader() {
    const path = this.getCurrentPathSpliced();
    return path.length > 0 && path[1] !== 'welcome';
  }

  isDisconnectDisplayed(): boolean {
    const path = this.getCurrentPathSpliced();
    return this.authService.isAuth() && path.length > 0 && path[1] !== 'play' ;
  }


  isPolyQuizDisplayed(): boolean {
    const path = this.getCurrentPathSpliced();
    return path.length > 0 && path[1] !== 'play' ;
  }


  isQuitDisplayed(): boolean {
    const path = this.getCurrentPathSpliced();
    return this.authService.isAuth() && path.length > 0 && path[1] === 'play';
  }

  isOnAdminLoginPage(): boolean {
    const path = this.getCurrentPathSpliced();
    console.log(path.length > 2 && path[2] === 'admin');
    return path.length > 2 && path[2] === 'admin';
  }

}
