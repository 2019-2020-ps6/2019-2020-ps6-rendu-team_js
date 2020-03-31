import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-residents-informations',
  templateUrl: './residents-informations.component.html',
  styleUrls: ['./residents-informations.component.scss']
})
export class ResidentsInformationsComponent implements OnInit {

  assistanceArray = [
    {name: 'Visuelle', value: 'visuelle', id: 0, checked: false},
    {name: 'Motrice', value: 'motrice', id: 1, checked: false}
  ];


  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  private isDeleteButtonPressed: boolean;

  @Input()
  user: User;

  constructor() {
  }

  ngOnInit() {
    this.isDeleteButtonPressed = false;
  }


  backPressed() {
    this.isBackPressed.emit(true);
  }

  deleteButtonPressed() {
    if (this.isDeleteButtonPressed === true) {
      this.isDeleteButtonPressed = false;
      console.log('to Delete');
    } else {
      this.isDeleteButtonPressed = true;
    }
  }

  statsButtonPressed() {

  }

  shareButtonPressed() {

  }
}
