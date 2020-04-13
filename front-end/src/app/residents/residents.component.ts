import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-residents',
    templateUrl: './residents.component.html',
    styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

    users: User[];

    private isCreateAccountWindowOpen: boolean;
    private isInformationWindowOpen: boolean;
    private isCopyParamWindowOpen: boolean;
    private userSharingHisParameter: User;
    private userSelectedInformation: User;
    private usersToCopyParamUpon: User[] = [];

    constructor(private authServices: AuthService) {
        this.isCreateAccountWindowOpen = false;
        this.isInformationWindowOpen = false;
        this.isCopyParamWindowOpen = false;
    }

    ngOnInit() {
        this.updateResidentsList();
        this.userSharingHisParameter = undefined;
    }

    openCreateAccountWindow() {
        this.isCreateAccountWindowOpen = !this.isCreateAccountWindowOpen;
    }

    openResidentInformationWindow(user: User) {
        this.userSelectedInformation = user;
        this.isInformationWindowOpen = !this.isInformationWindowOpen;
    }

    isWindowOpen() {
        return this.isCreateAccountWindowOpen || this.isInformationWindowOpen || this.isCopyParamWindowOpen;
    }

    getUserSelectedInformation() {
        return this.userSelectedInformation.hasOwnProperty('username') ? this.userSelectedInformation : {} as User;
    }

    updateResidentsList() {
        this.authServices.getResidents().subscribe((users) => {
            this.users = users as User[];
        });
    }

  goBackToUserInformation() {
    this.userSharingHisParameter = undefined;
    this.isInformationWindowOpen = true;
    this.usersToCopyParamUpon = [];
  }

  saveButtonClicked() {
    this.isCopyParamWindowOpen = true;
  }
}
