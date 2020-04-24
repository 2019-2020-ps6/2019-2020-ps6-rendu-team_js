import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../../models/question.model';
import {Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz.service';
import {SettingsService} from '../../../../services/settings.service';

@Component({
  selector: 'app-quiz-response',
  templateUrl: './quiz-response.component.html',
  styleUrls: ['./quiz-response.component.scss']
})
export class QuizResponseComponent implements OnInit {

  @Input()
  answer: Answer;


  @Input()
  color: string;

  @Output()
  answerClicked: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor(private router: Router, public quizService: QuizService, private settingsService: SettingsService) {
  }

  ngOnInit() {
    console.log(this.color);
  }


}
