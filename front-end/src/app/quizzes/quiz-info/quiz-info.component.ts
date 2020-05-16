import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';
import {AuthService} from '../../../services/auth.service';
import {ToasterService} from '../../../services/toaster.service';
import {BehaviorSubject} from 'rxjs';

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

  private isFullyDisplayed = false;

  private themeColor: string;
  private lvlColor: string;
  private bgColor: string;

  @Output()
  private quizDeleted = new EventEmitter<Quiz>();

  constructor(private route: ActivatedRoute,
              private themesService: ThemesService,
              private toasterService: ToasterService,
              private authServices: AuthService,
              private quizService: QuizService) {}

  ngOnInit() {
    this.quiz.questions = [];
    this.quizService.setSelectedQuiz(this.quiz.id);
    this.themeColor = this.theme.color;
    this.bgColor = this.themeColor + '40';
    // tslint:disable-next-line:no-bitwise
    this.lvlColor = this.themeColor + 'D0';
  }

  deleteQuiz() {
    if (confirm('Etes-vous sur de vouloir supprimer ce quiz ?')) {
      this.quizService.deleteQuizObservable(this.quiz).subscribe((response) => {
        if (response.status === 204) {
          this.quizService.setQuizzesFromUrl();
          this.toasterService.activateToaster(false, 'Le quiz a bien été supprimé !', 3000);
          this.quizDeleted.emit(this.quiz);
        }
      }, error => {
        this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
      });
    }
  }
}
