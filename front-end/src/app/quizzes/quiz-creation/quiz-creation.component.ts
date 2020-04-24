import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {

  themeList: Theme[];

  isCreateThemeOpen: boolean;
  isQuestionListOpen: boolean;
  isGeneralOpen: boolean;

  isLoading: boolean;

  themeSelected: Theme;
  quizToCreate: Quiz;

  constructor(private formBuilder: FormBuilder,
              private  quizService: QuizService,
              private themesService: ThemesService) {

    this.isLoading = false;
    this.isCreateThemeOpen = false;
    this.isQuestionListOpen = false;
    this.isGeneralOpen = true;

    themesService.setThemes();
    this.themesService.themes$.subscribe((t) => {
      this.themeList = t;
      if (t !== undefined && t.length > 0) {
        this.themeSelected = t[0];
      }
    });

    this.quizForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      theme: [{} as Theme, [Validators.required]],
      difficulty: ['', [Validators.required]]
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

  resetValues() {
    this.quizForm.reset();
  }

  updatePartOfQuiz() {
    const quizName = this.quizForm.get('name').value;
    const theme = this.quizForm.get('theme').value;
    const diff = this.quizForm.get('difficulty').value;

    const quiz = {
      name: quizName,
      themeId: theme.id,
      theme: theme as Theme,
      difficulty: diff,
    } as Quiz;

    if (this.quizToCreate === undefined) {
      this.quizToCreate = quiz;

    } else {
      this.quizToCreate.name = quizName;
      this.quizToCreate.themeId = theme.id;
      this.quizToCreate.theme = theme;
      this.quizToCreate.difficulty = diff;
    }

    console.log(this.quizToCreate);
  }

  openGeneral() {
    this.isGeneralOpen = true;
    this.isQuestionListOpen = false;
  }

  openQuestion() {
    this.isGeneralOpen = false;
    this.isQuestionListOpen = true;
  }
}
