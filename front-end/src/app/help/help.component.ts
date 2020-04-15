import {Component, OnInit} from '@angular/core';
import {HelpService} from '../../services/help.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  urlFirstPart = 'https://www.youtube-nocookie.com/embed/';
  urlLastPart = '?autoplay=1&controls=0&modestbranding=1&rel=1&showinfo=0&color=red';
  videoId: string;

  constructor(private helpService: HelpService,
              public location: Location,
              private sanitizer: DomSanitizer) {
    this.videoId = 'dQw4w9WgXcQ';
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
        case 'login' :
          return 'V-_O7nl0Ii0';
        case 'themes' :
          return 'AyPkrf74ras';
        case 'stats' :
          return 'dQw4w9WgXcQ';
        case 'parameters' :
          return 'dQw4w9WgXcQ';
        case 'residents' :
          return 'dQw4w9WgXcQ';
        case 'quiz-creation' :
          return 'dQw4w9WgXcQ';
        default:
          return 'dQw4w9WgXcQ';
      }
    } else {
      return '';
    }
  }

  restartVideo() {

  }
}
