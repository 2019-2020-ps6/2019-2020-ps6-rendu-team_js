import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private location: Location,
              private authService: AuthService) {
  }

  ngOnInit() {
  }


  isUserItemDisplayed(): boolean {
    return this.authService.isAuth() && this.location.path() !== '/login';
  }

  isAdminItemDisplayed(): boolean {
    return this.authService.isAuth() && this.authService.getAuthLevel() > 0 && this.location.path() !== '/login';
  }

  isBackItemDisplayed(): boolean {
    return this.location.path() === '/login';
  }

}
