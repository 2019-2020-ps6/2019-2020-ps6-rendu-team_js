import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {Answer, Question} from '../../models/question.model';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})

export class PlayQuizComponent implements OnInit {

  // public quiz: Quiz = null;  //syntax to assign & define on same statement
  public quiz: Quiz;
  public questionNumber: number;
  public userAnswers: Answer[];
  public beginDate: number;
  public endDate: number;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz); // set class var quiz
}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);

    // this.questionNumber = +this.route.snapshot.paramMap.get('questionNumber');  // +in front of string cast string to int

    this.questionNumber = 0;  // initialize vars
    this.userAnswers = [];
  }

  addToUserAnswers(answer: Answer) {
    // console.log('Last answer', answer);
    this.userAnswers.push(answer);
    console.log('user answers array', this.userAnswers);

    this.questionNumber++;
  }

  isOver() {
    if (this.questionNumber >= this.quiz.questions.length) {
      return true;
    } else {
      return false;
    }
  }

  redirectToResult() {
    this.router.navigate(['/play', this.quiz.id, '/result']);
  }

  setBeginDateToCurrent() {
    this.beginDate = Date.now();
  }

  setEndDateToCurrent() {
    this.endDate = Date.now();
  }

  getPlayTime() {
    return this.endDate - this.beginDate;
  }

  generateFinalUserAnswer() {
    return Object.create({quizId: this.quiz.id,
    answers: this.userAnswers,
    playTime: this.getPlayTime(),
    date: this.beginDate,
    userId: -1});
  }

}
