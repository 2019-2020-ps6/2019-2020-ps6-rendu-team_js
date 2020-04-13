import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';
import {Settings} from '../../../models/settings.model';
import {AuthService} from '../../../services/auth.service';
import {SettingsService} from '../../../services/settings.service';
import {Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';

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
              private toasterService: ToasterService,
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
    const usersId = this.usersToCopyParamUpon.map((u) => u.id);
    this.settingsService.copyUserSettingsToOtherAccounts(this.userParameterToCopy.id, usersId).subscribe(response => {
      if (response.status === 200) {
        this.toasterService.activateToaster(false, 'Paramètres copiés !', 2000);

        // allow to reload even if it's on the same route
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/residents']));
      } else {

        this.toasterService.activateToaster(false, 'Une erreur est survenue, réessayer plus tard...', 2000);
      }
    });

  }
}
