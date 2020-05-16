import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  private theme: Theme = {name: ' '} as Theme;
  private quizList: Quiz[];
  private quizList$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizList);
  private theme$: BehaviorSubject<Theme> = new BehaviorSubject(this.theme);


  private quizListFiltered: Quiz[];

  private isFilterOpen: boolean;

  private isEasyActive: boolean;
  private isMediumActive: boolean;
  private isHardActive: boolean;
  private textFilter: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private themesService: ThemesService,
              private quizService: QuizService) {

    const themeId = this.route.snapshot.paramMap.get('id');
    this.themesService.setThemeSelectedFromId(themeId);
    this.quizList = [];
    this.quizListFiltered = [];
    this.isFilterOpen = false;
    this.textFilter = 'Filtrer';

    this.themesService.themeSelected$.pipe(take(1)).subscribe((t) => {
      this.theme = t;
      this.theme$.next(this.theme);

      this.quizService.getQuizzesFromThemeId(this.theme.id).subscribe((q) => {
        this.quizList = q;
        this.quizList$.next(this.quizList);
        this.quizListFiltered = q;
      });
    });
  }

  ngOnInit() {


  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  QuizEditor(quiz: Quiz) {
    this.router.navigate(['/quiz-editor-preview/' + quiz.name]);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }

  filterButtonClicked() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  isAnyFilterActive() {
    return this.isEasyActive || this.isMediumActive || this.isHardActive;
  }

  updateTextFilter() {
    if (this.isAnyFilterActive()) {
      // this.textFilter = 'Des filtres sont activés';
    } else {
      this.textFilter = 'Filtrer';
    }
  }

  getArrayOfActiveFilter(): string[] {
    const array = [];

    if (this.isEasyActive) {
      array.push('Facile');
    }
    if (this.isMediumActive) {
      array.push('Moyen');
    }
    if (this.isHardActive) {
      array.push('Difficile');
    }

    return array;
  }

  updateQuizListFiltered() {
    if (this.isAnyFilterActive()) {
      const difficultyArray = this.getArrayOfActiveFilter();
      this.quizListFiltered = this.quizList.filter((q) => {
        return difficultyArray.indexOf(q.difficulty) > -1;
      });

    } else {
      this.quizListFiltered = this.quizList;
    }
  }

  easyButtonPressed() {
    this.isEasyActive = !this.isEasyActive;
    this.isMediumActive = false;
    this.isHardActive = false;
    this.updateTextFilter();
    this.updateQuizListFiltered();
  }


  mediumButtonPressed() {
    this.isEasyActive = false;
    this.isMediumActive = !this.isMediumActive;
    this.isHardActive = false;
    this.updateTextFilter();
    this.updateQuizListFiltered();
  }


  hardButtonPressed() {
    this.isEasyActive = false;
    this.isMediumActive = false;
    this.isHardActive = !this.isHardActive;
    this.updateTextFilter();
    this.updateQuizListFiltered();
  }

  resetFilters() {
    this.isEasyActive = false;
    this.isMediumActive = false;
    this.isHardActive = false;
    this.updateTextFilter();
    this.updateQuizListFiltered();
  }

  backPress() {
    this.router.navigate(['/quiz-list']);
  }

  noQuizAvailable(): boolean {
    if (this.quizListFiltered === undefined) {
      return true;
    } else {
      return this.quizListFiltered.length === 0;
    }
  }
}
