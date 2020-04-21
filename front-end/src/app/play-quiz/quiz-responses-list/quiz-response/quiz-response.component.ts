import {Component, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../../models/question.model';
import {Quiz} from '../../../../models/quiz.model';
import {Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz.service';
import {Settings} from '../../../../models/settings.model';
import {SettingsService} from '../../../../services/settings.service';

@Component({
  selector: 'app-quiz-response',
  templateUrl: './quiz-response.component.html',
  styleUrls: ['./quiz-response.component.scss']
})
export class QuizResponseComponent implements OnInit {

  @Input()
  public answer: Answer;

  settings: Settings;

  constructor(private router: Router, public quizService: QuizService, private settingsService: SettingsService) {
    this.settings = settingsService.settings;
    console.log('user settings', this.settings);
  }

  ngOnInit() {
    this.adaptCssToSettings();
  }

  adaptCssToSettings() {
    if (this.settings != null) {
      const buttons = document.getElementsByClassName('responseButton');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < buttons.length; i++) {
        if (this.settings.fontSize === 1) {
          // @ts-ignore
          buttons[i].style.setProperty('--fontSize', '500%');
        } else {
          // @ts-ignore
          buttons[i].style.setProperty('--fontSize', '1000%');
        }

        // TODO add condition and css vars for :
        // document.documentElement.style.setProperty('--contraste', this.settings.contraste + '');
        // // console.log('css property', document.documentElement.style.getPropertyValue('--contraste'));
        // document.documentElement.style.setProperty('--fontSize', this.settings.fontSize + '');
        // document.documentElement.style.setProperty('--moteur', this.settings.handicapMoteur + '');
        // document.documentElement.style.setProperty('--visuel', this.settings.handicapVisuel + '');
        // document.documentElement.style.setProperty('--tailleSelec', this.settings.tailleSelection + '');
      }
    }
  }

}
