import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private location: Location,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }


  isUserItemDisplayed(): boolean {
    const path = this.location.path().split('/');
    return this.authService.isAuth() && path.length > 0 && path[1] !== 'login';
  }

  isAdminItemDisplayed(): boolean {
    const path = this.location.path().split('/');
    return this.authService.isAuth() && this.authService.getAuthLevel() > 0 && path.length > 0 && path[1] !== 'login';
  }

  isBackItemDisplayed(): boolean {
    const path = this.location.path().split('/');
    return path.length > 0 && path[1] === 'login';
  }

  isMenuDisplayed(): boolean {
    const path = this.location.path().split('/');
    return path.length > 0 && path[1] !== 'welcome';
  }

}
