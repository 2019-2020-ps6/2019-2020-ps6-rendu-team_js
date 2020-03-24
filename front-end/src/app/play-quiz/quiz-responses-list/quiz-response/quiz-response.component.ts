import {Component, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../../models/question.model';
import {Quiz} from '../../../../models/quiz.model';
import {Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz.service';

@Component({
  selector: 'app-quiz-response',
  templateUrl: './quiz-response.component.html',
  styleUrls: ['./quiz-response.component.scss']
})
export class QuizResponseComponent implements OnInit {

  @Input()
  public answer: Answer;

  constructor(private router: Router, public quizService: QuizService) {

  }

  ngOnInit() {
  }

}
