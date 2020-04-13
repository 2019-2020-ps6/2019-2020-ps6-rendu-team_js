import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';
import {Settings} from '../../../models/settings.model';
import {AuthService} from '../../../services/auth.service';
import {SettingsService} from '../../../services/settings.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-param-copy',
  templateUrl: './confirm-param-copy.component.html',
  styleUrls: ['./confirm-param-copy.component.scss']
})
export class ConfirmParamCopyComponent implements OnInit {

  @Input()
  userParameterToCopy: User;

  @Input()
  usersToCopyParamUpon: User[];



  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  isModifyingEventHappened: EventEmitter<boolean> = new EventEmitter<boolean>(); // emit to update the resident list;


  private isDeleteButtonPressed: boolean;
  private hasModificationsBeenMade: boolean;

  private message: string;
  private isErrorMessage: boolean;


  settingsOfUserToCopy: Settings;

  constructor(private authServices: AuthService,
              private settingsService: SettingsService,
              private router: Router) {
  }

  ngOnInit() {
    this.isDeleteButtonPressed = false;
    this.settingsService.setSelectedSettings(this.userParameterToCopy.id);

    this.hasModificationsBeenMade = false;
    this.isErrorMessage = false;
    this.message = '';
  }


  backPressed() {
    this.isBackPressed.emit(true);
  }


  async showMessage(message: string, ms: number) {
    return new Promise(resolve => {
      this.message = message;
      setTimeout(resolve, ms);
    }).then(() => this.message = '');
  }

  saveButtonPressed() {

    // this.settingsService.modifyBaseSettings(this.settings, this.user.id).subscribe((response => {
    //   if (response.status === 200) {
    //     this.assistanceArrayOriginal[0].checked = this.settings.handicapVisuel;
    //     this.assistanceArrayOriginal[1].checked = this.settings.handicapMoteur;
    //
    //
    //     this.showMessage('Paramètres enregistrés !', 2000);
    //     this.isErrorMessage = false;
    //   } else {
    //     this.showMessage('Une erreur est survenue, réessayer plus tard...', 2000);
    //     this.isErrorMessage = true;
    //   }
    // }));
  }
}
