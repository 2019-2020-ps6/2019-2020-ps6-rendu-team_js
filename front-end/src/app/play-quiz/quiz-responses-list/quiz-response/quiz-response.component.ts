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


  @Input()
  public color: string;

  constructor(private router: Router, public quizService: QuizService, private settingsService: SettingsService) {
  }

  ngOnInit() {
    console.log(this.color);
  }


}
