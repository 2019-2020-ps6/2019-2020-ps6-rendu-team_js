import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.scss']
})
export class QuizInfoComponent implements OnInit {

  @Input()
  private theme: Theme;

  @Input()
  private quiz: Quiz;

  constructor(private route: ActivatedRoute,
              private themesService: ThemesService,
              private authServices: AuthService,
              private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    this.quiz.questions = [];
    this.quizService.setSelectedQuiz(this.quiz.id);
  }

}
