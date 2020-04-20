import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {Answer, Question} from '../../models/question.model';
import {ResultService} from '../../services/result.service';
import {AuthService} from '../../services/auth.service';
import {GamesService} from '../../services/games.service';
import {Game} from '../../models/game.model';

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
  private playTimeOld = 0;

  public resultId = -1;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router,
              private route: ActivatedRoute,
              private quizService: QuizService,
              private gameService: GamesService,
              private resultService: ResultService,
              private authService: AuthService) {

    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz); // set class var quiz
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);

    // this.questionNumber = +this.route.snapshot.paramMap.get('questionNumber');  // +in front of string cast string to int

    this.questionNumber = 0;  // initialize vars
    this.userAnswers = [];

    // check if their is already a tentative for this quiz
    this.gameService.getGameFromQuiz(+this.authService.user.id, +id).subscribe((res: Game) => {
      // console.log('last try', res);
      if (res !== null) {
        this.userAnswers = res.answers;
        this.questionNumber = res.answers.length;
        this.playTimeOld = res.playTime;
      }
    });

  }

  addToUserAnswers(answer: Answer) {
    // console.log('Last answer', answer);
    const answerConformWithBack = {questionId: answer.questionId, answerId: answer.id};
    this.userAnswers.push(answerConformWithBack);
    // console.log('user answers array', this.userAnswers);

    this.questionNumber++;

    // save user answer in back
    this.gameService.updateGame(this.getCurrentGameTry()).subscribe(response => {
      if (response.status === 200) {
        console.log('sauvegarde reussit !');
      } else {
        console.log('sauvegarde impossible !');
      }
    });
  }

  isOver() {
    if (this.questionNumber >= this.quiz.questions.length) {
      return true;
    } else {
      return false;
    }
  }

  redirectToResult() {
      const completeAnswer = this.generateFinalUserAnswer();
      this.sendFinalAnswerToServiceAndSetResponseId(completeAnswer);
  }

  setBeginDateToCurrent() {
    this.beginDate = Date.now();
  }

  setEndDateToCurrent() {
    this.endDate = Date.now();
  }

  getPlayTime() {
    return (this.endDate - this.beginDate) + this.playTimeOld;
  }

  generateFinalUserAnswer() {
    const tmp = {
      quizId: this.quiz.id + '',
      answers: this.userAnswers,
      playTime: this.getPlayTime(),
      date: this.beginDate,
      userId: Number(this.authService.user.id)
    };

    // console.log('final user answer object', tmp);
    return tmp;
  }

  sendFinalAnswerToServiceAndSetResponseId(completeAnswer) {
    // delete last try & update stats
    this.gameService.finishGame(this.getCurrentGameTry()).subscribe(response => {
      if (response.status === 200) {
        console.log('sauvegarde reussit !');
      } else {
        console.log('sauvegarde impossible !');
      }
    });

    this.resultService.addResult(completeAnswer).subscribe((res: number) => {
      // console.log('result id front side', res);
      this.resultId = res;

      if (this.resultId !== -1) {

        console.log('hi from observer');

        this.router.navigate(['/result', this.resultId]);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  public getCurrentGameTry() {
    const game = {
      date: Date.now(),
      quizId: this.quiz.id + '',
      answer: this.userAnswers[this.userAnswers.length - 1],
      userId: this.authService.user.id
    };

    return game;
  }

}
