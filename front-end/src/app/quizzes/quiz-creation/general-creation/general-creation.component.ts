import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Theme} from '../../../../models/theme.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../../services/quiz.service';
import {ThemesService} from '../../../../services/themes.service';
import {Quiz} from '../../../../models/quiz.model';

@Component({
  selector: 'app-general-creation',
  templateUrl: './general-creation.component.html',
  styleUrls: ['./general-creation.component.scss']
})
export class GeneralCreationComponent implements OnInit {

  themeList: Theme[];
  themeSelected: Theme;
  isCreateThemeOpen: boolean;
  isLoading: boolean;
  quizForm: FormGroup;
  quizToCreate: Quiz;

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  isCreateThemeOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private  quizService: QuizService,
              private themesService: ThemesService) {
    this.isLoading = false;
    this.isCreateThemeOpen = false;

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

  ngOnInit() {
    this.themesService.themes$.subscribe((t) => {
      this.themeList = t;
    });
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

  openWindowsCreateTheme(b: boolean) {
    this.isCreateThemeOpen = !this.isCreateThemeOpen;
    this.isCreateThemeOpened.emit(b);
  }

}
