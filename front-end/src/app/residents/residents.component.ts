import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';

@Component({
    selector: 'app-residents',
    templateUrl: './residents.component.html',
    styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

    private isCreateAccountWindowOpen: boolean;
    private isInformationWindowOpen: boolean;
    private userSelectedInformation: User;

    constructor() {
        this.isCreateAccountWindowOpen = false;
        this.isInformationWindowOpen = false;
    }

    ngOnInit() {
    }

    openCreateAccountWindow() {
        this.isCreateAccountWindowOpen = !this.isCreateAccountWindowOpen;
    }

    openResidentInformationWindow(user: User) {
        console.log('the real id is :' + user.id);
        this.userSelectedInformation = user;
        this.isInformationWindowOpen = !this.isInformationWindowOpen;
    }

    isWindowOpen() {
        return this.isCreateAccountWindowOpen || this.isInformationWindowOpen;
    }

    getUserSelectedInformation() {
        return this.userSelectedInformation.hasOwnProperty('username') ? this.userSelectedInformation : {} as User;
    }
}
