import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {

  themeList: Theme[];
  isCreateThemeOpen: boolean;
  themeSelected: Theme;

  constructor(private formBuilder: FormBuilder,
              private  quizService: QuizService,
              private themesService: ThemesService) {

    this.isCreateThemeOpen = false;

    themesService.setThemes();
    this.themesService.themes$.subscribe((t) => {
      this.themeList = t;
      if (t !== undefined && t.length > 0) {
        this.themeSelected = t[0];
      }
    });

    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [{} as Theme],
      difficulty: ['']
    });
  }

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
    // const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    // this.quizService.addQuiz(quizToCreate);
    // console.log(quizToCreate);
    console.log(this.quizForm.get('theme').value);
    // const theme: Observable<Theme> = this.themesService.getThemeSelectedFromId(quizToCreate.themeId);
    // this.themesService.increaseThemeQuizNumber(theme, quizToCreate.themeId);
  }

  isWindowOpen() {
    return this.isCreateThemeOpen;
  }
}
