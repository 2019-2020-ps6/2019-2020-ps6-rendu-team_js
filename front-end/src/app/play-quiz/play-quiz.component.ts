import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {Question} from '../../models/question.model';
import {ResultService} from '../../services/result.service';
import {AuthService} from '../../services/auth.service';
import {GamesService} from '../../services/games.service';
import {Game} from '../../models/game.model';
import {Answer} from '../../models/answer.model';
import Swal from 'sweetalert2';

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
  private date;

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
    this.date = Date.now();
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


    Swal.fire({
      reverseButtons: true,
      icon: 'question',
      title: 'Votre réponse est bien "' + answer.value + '" ?',
      confirmButtonText: 'Oui',
      confirmButtonColor: '#1261a2',
      cancelButtonText: 'Non',
      showCancelButton: true
    })
      .then((result) => {

        if (result.value) {

          this.questionNumber++;
          // console.log('Last answer', answer);
          const answerConformWithBack = {questionId: answer.questionId, answerId: answer.id};
          this.userAnswers.push(answerConformWithBack);
          // console.log('user answers array', this.userAnswers);

          if (this.isOver()) {
            this.setEndDateToCurrent();
            this.redirectToResult();
          } else {
            this.gameService.updateGame(this.getCurrentGameTry()).subscribe(response => {
              if (response.status === 200) {
                console.log('sauvegarde reussit !');
              } else {
                console.log('sauvegarde impossible !');
              }
              this.date = Date.now();
            });
          }

          // setTimeout(() => {
          //     // console.log('Last answer', answer);
          //     const answerConformWithBack = {questionId: answer.questionId, answerId: answer.id};
          //     this.userAnswers.push(answerConformWithBack);
          //     // console.log('user answers array', this.userAnswers);
          //
          //     // save user answer in back
          //     if (!this.isOver()) {
          //       this.gameService.updateGame(this.getCurrentGameTry()).subscribe(response => {
          //         if (response.status === 200) {
          //           console.log('sauvegarde reussit !');
          //
          //         } else {
          //           console.log('sauvegarde impossible !');
          //         }
          //         this.date = Date.now();
          //       });
          //
          //     } else {
          //       this.setEndDateToCurrent();
          //       this.redirectToResult();
          //     }
          // },
          // 1200);
        } else {

        }

      });
  }

  isOver() {
    return this.quiz !== undefined && this.quiz.questions !== undefined && this.questionNumber >= this.quiz.questions.length;
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
    return {
      quizId: this.quiz.id + '',
      answers: this.userAnswers,
      playTime: this.getPlayTime(),
      date: this.beginDate,
      userId: Number(this.authService.user.id)
    };
  }

  sendFinalAnswerToServiceAndSetResponseId(completeAnswer) {

    // delete last try & update stats
    const game = this.getCurrentGameTry();
    this.gameService.finishGame(game).subscribe((response) => {
      if (response.status === 200 || response.status === 201) {
        this.router.navigate(['/result/' + response.body]);

      } else {
        this.router.navigate(['/']);
      }
    });

  }

  public getCurrentGameTry() {
    return {
      date: this.date,
      quizId: this.quiz.id + '',
      answer: this.userAnswers[this.userAnswers.length - 1],
      userId: this.authService.user.id
    };
  }

}
