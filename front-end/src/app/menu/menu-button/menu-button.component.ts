import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {

  @Input() name: string;
  @Input() imageName: string;
  @Input() routerPath: string;

  imagePath: string;

  constructor() {
  }

  ngOnInit() {
    this.imagePath = 'assets/images/' + this.imageName;
  }

}
