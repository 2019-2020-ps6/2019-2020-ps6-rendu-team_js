import {Component, OnInit} from '@angular/core';
import {HelpService} from '../../services/help.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../models/settings.model';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  urlFirstPart = 'https://www.youtube-nocookie.com/embed/';
  urlLastPart = '?autoplay=1&controls=0&modestbranding=1&rel=1&showinfo=0&color=red';
  videoId: string;

  settings: Settings;

  constructor(private helpService: HelpService,
              private location: Location,
              private authServices: AuthService,
              private settingsService: SettingsService,
              private sanitizer: DomSanitizer) {

    this.videoId = 'dQw4w9WgXcQ';
    this.settingsService.settings$.subscribe((s) => {
      this.settings = s;
      console.log(s);
    });
  }

  ngOnInit() {
  }

  deactivateWindow() {
    this.helpService.activateWindow(false);
  }

  getCorrectVideoId()
    :
    string {
    const path = this.location.path().split('/');

    if (path.length > 0) {
      switch (path[1]) {
        case 'login' : // ======================================== LOGIN
          if (this.isBigFontActive()) { // Big font size
            return 'V-_O7nl0Ii0';
          } else {  // Medium
            return 'AyPkrf74ras';
          }

        case 'themes' : // ======================================= THEMES
          if (this.isBigFontActive()) { // Big font size
            return 'dQw4w9WgXcQ';
          } else { // Medium
            return 'AyPkrf74ras';
          }

        case 'stats' : // ======================================== STATS
          if (this.isBigFontActive()) { // Big font size
            return 'dQw4w9WgXcQ';
          } else { // Medium
            return 'AyPkrf74ras';
          }

        case 'parameters' : // =================================== SETTINGS
          if (this.isBigFontActive()) { // Big font size
            return 'dQw4w9WgXcQ';
          } else { // Medium
            return 'AyPkrf74ras';
          }

        case 'residents' : // ==================================== RESIDENTS
          return 'AyPkrf74ras';

        case 'quiz-creation' : // ================================ QUIZ CREATION
          return 'dQw4w9WgXcQ';

        default: // ============================================== DEFAULT
          return 'dQw4w9WgXcQ';
      }
    } else {
      return '';
    }
  }

  isBigFontActive() {

    if (this.settingsService.settings !== undefined) {
      return this.settingsService.settings.fontSize === 2;
      // 1 == medium
      // 2 == big
    }

    return true;
  }

  restartVideo() {

  }
}
