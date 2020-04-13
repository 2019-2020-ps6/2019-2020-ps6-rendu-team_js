import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Settings} from '../../../models/settings.model';
import {SettingsService} from '../../../services/settings.service';

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

  assistanceArrayOriginal = [
    {name: 'Visuelle', value: 'visuelle', id: 0, checked: false},
    {name: 'Motrice', value: 'motrice', id: 1, checked: false}
  ];

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  isModifyingEventHappened: EventEmitter<boolean> = new EventEmitter<boolean>(); // emit to update the resident list;


  @Output()
  userSharingHisParameters: EventEmitter<User> = new EventEmitter<User>();

  private isDeleteButtonPressed: boolean;
  private hasModificationsBeenMade: boolean;

  private message: string;
  private isErrorMessage: boolean;

  @Input()
  user: User;

  settings: Settings;

  constructor(private authServices: AuthService,
              private settingsService: SettingsService,
              private router: Router) {
  }

  ngOnInit() {
    this.isDeleteButtonPressed = false;
    this.settingsService.setSelectedSettings(this.user.id);
    this.settingsService.settingsSelected$.subscribe((s) => {
      this.settings = s;
      this.assistanceArray[0].checked = this.settings.handicapVisuel;
      this.assistanceArray[1].checked = this.settings.handicapMoteur;

      this.assistanceArrayOriginal[0].checked = this.settings.handicapVisuel;
      this.assistanceArrayOriginal[1].checked = this.settings.handicapMoteur;
    });

    this.hasModificationsBeenMade = false;
    this.isErrorMessage = false;
    this.message = '';
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
    this.router.navigate(['/admin/' + this.user.id + '/stats']);
  }

  shareButtonPressed() {
    this.userSharingHisParameters.emit(this.user);
    this.backPressed();
  }

  hasChangeBeenDone(): boolean {
    for (let i = 0; i < this.assistanceArray.length; i++) {
      if (this.assistanceArray[i].checked !== this.assistanceArrayOriginal[i].checked) {
        return true;
      }
    }

    return false;
  }

  changeState(id: number) {
    this.assistanceArray[id].checked = !this.assistanceArray[id].checked;
  }

  confirmDeletionPressed() {
    this.authServices.deleteResidentAccount(this.user).subscribe(() => {
      this.isModifyingEventHappened.emit(true);
      this.backPressed();
    });
  }

  async showMessage(message: string, ms: number) {
    return new Promise(resolve => {
      this.message = message;
      setTimeout(resolve, ms);
    }).then(() => this.message = '');
  }

  saveButtonPressed() {

    this.settings.handicapVisuel = this.assistanceArray[0].checked;
    this.settings.handicapMoteur = this.assistanceArray[1].checked;

    this.settingsService.modifyBaseSettings(this.settings, this.user.id).subscribe((response => {
      if (response.status === 200) {
        this.assistanceArrayOriginal[0].checked = this.settings.handicapVisuel;
        this.assistanceArrayOriginal[1].checked = this.settings.handicapMoteur;


        this.showMessage('Paramètres enregistrés !', 2000);
        this.isErrorMessage = false;
      } else {
        this.showMessage('Une erreur est survenue, réessayer plus tard...', 2000);
        this.isErrorMessage = true;
      }
    }));
  }
}
