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
    if (this.routerPath !== '') {
      this.router.navigate([this.routerPath]);
    }
  }
}
