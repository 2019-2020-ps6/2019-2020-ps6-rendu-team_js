import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz.service';
import {Quiz} from '../../../../models/quiz.model';

@Component({
  selector: 'app-quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss']
})
export class QuizHeaderComponent implements OnInit {

  @Input() date: number;
  @Input() playTime: number;
  @Input() userScore: number;
  @Input() maxScore: number;
  @Input() quizId: string;

  private playTimePreFormat: Date;
  private datePreFormat: Date;
  private quiz: Quiz;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz); // set class var quiz
  }

  ngOnInit() {
    this.quizService.setSelectedQuiz(this.quizId);

    this.datePreFormat = new Date(this.date);
    this.playTimePreFormat = new Date(this.playTime);
  }

}
