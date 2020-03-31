import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-residents-item',
  templateUrl: './residents-item.component.html',
  styleUrls: ['./residents-item.component.scss']
})
export class ResidentsItemComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
