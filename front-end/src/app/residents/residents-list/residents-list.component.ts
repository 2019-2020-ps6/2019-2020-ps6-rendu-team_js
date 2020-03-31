import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-residents-list',
  templateUrl: './residents-list.component.html',
  styleUrls: ['./residents-list.component.scss']
})
export class ResidentsListComponent implements OnInit {

  @Input()
  users: User[];

  @Output()
  userInformation: EventEmitter<User> = new EventEmitter<User>();

  constructor(private authServices: AuthService) {

  }

  ngOnInit() {
  }

  emitUser(user: User) {
    this.userInformation.emit(user);
    console.log('user id: ' + user.id);
  }


}
