import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

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

  @Output()
  isModifyingEventHappened: EventEmitter<boolean> = new EventEmitter<boolean>(); // emit to update the resident list;

  private isDeleteButtonPressed: boolean;

  @Input()
  user: User;

  constructor(private authServices: AuthService,
              private router: Router) {
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
    } else {
      this.isDeleteButtonPressed = true;
    }
  }

  statsButtonPressed() {

  }

  shareButtonPressed() {

  }

  confirmDeletionPressed() {
    this.authServices.deleteResidentAccount(this.user).subscribe(() => {
      this.isModifyingEventHappened.emit(true);
      this.backPressed();
    });
  }
}
