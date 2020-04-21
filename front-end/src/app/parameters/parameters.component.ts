import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../models/settings.model';
import {ToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  private userSettings: Settings;

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService,
              private toasterService: ToasterService,
              private auth: AuthService) {
    this.settingsService.settings$.subscribe((settings) => this.userSettings = settings);
  }

  ngOnInit() {
    const userId = this.auth.user.id.toString();
    this.settingsService.setSelectedSettings(userId);
  }


  resetSettingsToDefault() {
    this.settingsService.resetSettings(this.userSettings, this.auth.user.id).subscribe((response) => {
      if (response.status === 200) {
        const userId = this.auth.user.id.toString();
        this.settingsService.setSelectedSettings(userId);
        this.userSettings = this.settingsService.settings;
        console.log(this.userSettings);
        this.toasterService.activateToaster(false, 'Les paramètres ont été remis à zeros', 2000);

      } else {
        this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);

      }
    });
  }

  selectionSizeEvent($event) {
    this.userSettings.tailleSelection = $event;
    this.settingsService.updateSettings(this.userSettings, this.auth.user.id).subscribe((response) => {
      if (response.status === 200) {
        this.toasterService.activateToaster(false, 'Taille de la sélection enregistrée !', 1000);

      } else {
        this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
      }
    });
  }

  contrastEvent($event) {
    this.userSettings.contraste = $event;
    this.settingsService.updateSettings(this.userSettings, this.auth.user.id).subscribe((response) => {
      if (response.status === 200) {
        this.toasterService.activateToaster(false, 'Contraste enregistré !', 1000);

      } else {
        this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
      }
    });
  }

  fontSizeEvent($event) {
    this.userSettings.fontSize = $event;
    this.settingsService.updateSettings(this.userSettings, this.auth.user.id).subscribe((response) => {
      if (response.status === 200) {
        this.toasterService.activateToaster(false, 'Taille de la police enregistrée !', 1000);

      } else {
        this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
      }
    });
  }

}
