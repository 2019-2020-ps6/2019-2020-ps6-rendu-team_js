import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {Answer, Question} from '../../models/question.model';
import {ResultService} from '../../services/result.service';
import {AuthService} from '../../services/auth.service';

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

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private resultService: ResultService, private authService: AuthService) {
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
    const answerConformWithBack = {questionId: answer.questionId, answerId: answer.id};
    this.userAnswers.push(answerConformWithBack);
    // console.log('user answers array', this.userAnswers);

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
    this.router.navigate(['/result', this.sendFinalAnswerToServiceAndReturnResponseId()]);
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
    const tmp = {quizId: this.quiz.id + '',
      answers: this.userAnswers,
      playTime: this.getPlayTime(),
      date: this.beginDate,
      userId: Number(this.authService.user.id)
    };

    // console.log('final user answer object', tmp);
    return tmp;
  }

  sendFinalAnswerToServiceAndReturnResponseId(): number {
    this.resultService.addResult(this.generateFinalUserAnswer());
    this.resultService.resultIdSelected$.subscribe((res: number) => {
      console.log('result id front side', res);
    });
    return 1585638738670; // mock result
    // this.resultService.resultIdSelected$.unsubscribe()
  }

}
