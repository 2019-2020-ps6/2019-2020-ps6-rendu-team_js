import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {

  private themeList: Theme[];
  private themeList$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themeList);

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private themesService: ThemesService) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      themeId: [],
      difficulty: ['']
    });
  }

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    this.themesService.themes$.subscribe((t) => {
      this.themeList = t;
    });
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }

  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    this.quizService.addQuiz(quizToCreate);
    console.log(quizToCreate);
    const theme: Observable<Theme> = this.themesService.getThemeSelectedFromId(quizToCreate.themeId);
    this.themesService.increaseThemeQuizNumber(theme, quizToCreate.themeId);
  }

}
