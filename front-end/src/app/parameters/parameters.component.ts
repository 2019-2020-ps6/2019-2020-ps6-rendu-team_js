import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../models/settings.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  private userSettings: Settings;

  constructor(private route: ActivatedRoute, private settingsService: SettingsService, private auth: AuthService) {
    this.settingsService.settingsSelected$.subscribe((settings) => this.userSettings = settings);
  }

  ngOnInit() {
    const userId = this.auth.user.id.toString();
    this.settingsService.setSelectedSettings(userId);
  }


}
