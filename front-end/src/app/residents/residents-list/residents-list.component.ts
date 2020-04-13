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

  @Input()
  userSharingHisParameters: User;

  @Output()
  userInformation: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  usersToCopyParametersUponEmitter: EventEmitter<User[]> = new EventEmitter<User[]>();

  usersToCopyParametersUpon: User[] = [];


  constructor(private authServices: AuthService) {
  }

  ngOnInit() {
    this.usersToCopyParametersUponEmitter.emit(this.usersToCopyParametersUpon);
  }

  emitUser(user: User) {

    console.log(user);

    if (this.userSharingHisParameters !== undefined) {

      if (!this.isGreyedOut(user)) {

        const indexItem = this.usersToCopyParametersUpon.indexOf(user);

        if (indexItem > -1) { // exist in the array so delete it ==> deselection
          this.usersToCopyParametersUpon.splice(indexItem, 1);

        } else { // doesnt exist in the array so add it to the list == > selection
          this.usersToCopyParametersUpon.push(user);
        }
      }

      this.usersToCopyParametersUponEmitter.emit(this.usersToCopyParametersUpon);

    } else {
      this.userInformation.emit(user);
    }

  }

  isGreyedOut(user: User) {
    if (this.userSharingHisParameters !== undefined) {
      if (user.id === this.userSharingHisParameters.id) {
        return true;
      }
    }

    return false;
  }

  isUserSelectedCopyParam(user: User) {
    if (this.userSharingHisParameters !== undefined) {
      const indexItem = this.usersToCopyParametersUpon.indexOf(user);
      return indexItem > -1;
    }
    this.usersToCopyParametersUpon = [];
    return false;
  }
}
