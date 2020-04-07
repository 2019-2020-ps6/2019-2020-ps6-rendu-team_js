import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme-item',
  templateUrl: './theme-item.component.html',
  styleUrls: ['./theme-item.component.scss']
})
export class ThemeItemComponent implements OnInit {

  @Input()
  themeName: string;

  @Input()
  bgColor: string;

  constructor() { }

  ngOnInit() {
  }

}
