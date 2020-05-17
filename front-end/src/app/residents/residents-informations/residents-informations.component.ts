import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Settings} from '../../../models/settings.model';
import {SettingsService} from '../../../services/settings.service';
import {ToasterService} from '../../../services/toaster.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert';

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

  private isEditNameOpen: boolean;

  private isDeleteButtonPressed: boolean;
  private hasModificationsBeenMade: boolean;

  private message: string;
  private isErrorMessage: boolean;

  public nameForm: FormGroup;

  @Input()
  user: User;

  settings: Settings;

  constructor(private authServices: AuthService,
              private settingsService: SettingsService,
              private formBuilder: FormBuilder,
              private toasterService: ToasterService,
              private router: Router) {
    this.isEditNameOpen = false;
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

    this.nameForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.maxLength(20), Validators.required]],
      lastName: [this.user.lastName, [Validators.maxLength(20), Validators.required]],
      assistanceArray: new FormArray([]),
    });

    this.hasModificationsBeenMade = false;
    this.isErrorMessage = false;
    this.message = '';
  }


  backPressed() {
    this.isBackPressed.emit(true);
  }

  deleteButtonPressed() {

    swal({
      className: 'swal-wide',
      title: 'Etes-vous sur de vouloir supprimer ce compte ?',
      icon: '../../../assets/images/warn.svg',
      buttons: ['Annuler', 'Confirmer'],
      dangerMode: false,
      closeOnClickOutside: false,
    })
      .then((willContinue) => {
        if (willContinue) {
          this.authServices.deleteResidentAccount(this.user).subscribe(() => {
            this.isModifyingEventHappened.emit(true);
            this.toasterService.activateToaster(false, 'Compte supprimé !', 2000);
            this.backPressed();
          });
        }
      });
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

    if (this.isEditNameOpen) {
      return this.nameForm.valid;
    }

    return false;
  }

  changeState(id: number) {
    this.assistanceArray[id].checked = !this.assistanceArray[id].checked;
  }

  confirmDeletionPressed() {

  }


  saveButtonPressed() {

    this.settings.handicapVisuel = this.assistanceArray[0].checked;
    this.settings.handicapMoteur = this.assistanceArray[1].checked;

    this.settingsService.modifyBaseSettings(this.settings, this.user.id).subscribe((response => {
      if (response.status === 200) {
        this.assistanceArrayOriginal[0].checked = this.settings.handicapVisuel;
        this.assistanceArrayOriginal[1].checked = this.settings.handicapMoteur;

        this.toasterService.activateToaster(false, 'Paramètres enregistrés !', 2000);

      } else {
        this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
      }
    }));

    if (this.isEditNameOpen) {
      const firstName = this.nameForm.get('firstName').value;
      const lastName = this.nameForm.get('lastName').value;

      this.authServices.updateUserName(this.user, firstName, lastName).subscribe((response => {
        if (response.status === 200) {
          this.isEditNameOpen = false;
          this.toasterService.activateToaster(false, 'Paramètres enregistrés !', 2000);

        } else {
          this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
        }
      }));
    }
  }

  closeNameEdit() {
    this.isEditNameOpen = false;
  }
}
