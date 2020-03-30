import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output()
  bodyBackgroundColor: EventEmitter<string> = new EventEmitter<string>();

  constructor(private location: Location,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getColor('#f2f2f2');
  }

  getColor(color: string) {
    this.bodyBackgroundColor.emit(color);
  }

  isUserItemDisplayed(): boolean {
    const path = this.location.path().split('/');
    return this.authService.isAuth() && path.length > 0 && path[1] !== 'login';
  }

  isAdminItemDisplayed(): boolean {
    const path = this.location.path().split('/');
    return this.authService.isAuth() && this.authService.getAuthLevel() > 0 && path.length > 0 && path[1] !== 'login';
  }

  isEmptyMenuDisplayed(): boolean {
    const path = this.location.path().split('/');
    return path.length > 0 && path[1] === 'login';
  }

  isBackItemDisplayed(): boolean {
    const path = this.location.path().split('/');
    return path.length > 1 && path[1] === 'login' && path[2] === 'admin';
  }

  isMenuDisplayed(): boolean {
    const path = this.location.path().split('/');
    return path.length > 0 && path[1] !== 'welcome' && path[1] !== 'play';
  }

}
