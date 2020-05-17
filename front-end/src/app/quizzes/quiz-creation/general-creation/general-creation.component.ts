import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Theme} from '../../../../models/theme.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../../services/quiz.service';
import {ThemesService} from '../../../../services/themes.service';
import {Quiz} from '../../../../models/quiz.model';
import {QuizCreationStatusService} from '../../../../services/quiz-creation-status.service';

@Component({
  selector: 'app-general-creation',
  templateUrl: './general-creation.component.html',
  styleUrls: ['./general-creation.component.scss']
})
export class GeneralCreationComponent implements OnInit {

  themeList: Theme[];
  themeSelected: Theme;
  name = '';
  difficulty = '';
  isCreateThemeOpen: boolean;
  isLoading: boolean;
  quizForm: FormGroup;

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  isCreateThemeOpened: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Input()
  quiz: Quiz;

  @Output()
  quizEmitter: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private formBuilder: FormBuilder,
              private  quizService: QuizService,
              private quizCreationStatusService: QuizCreationStatusService,
              private themesService: ThemesService) {

    this.themesService.themes$.subscribe((t) => {
      this.themeList = t.filter((theme) =>  !theme.deleted);
    });

    if (this.themesService.themes === undefined || this.themesService.themes === null) {
      this.themesService.setThemes();
    }

  }

  ngOnInit() {
    this.isLoading = false;
    this.isCreateThemeOpen = false;

    if (this.quiz) {
      this.name = this.quiz.name;
      this.difficulty = this.quiz.difficulty;

      this.themeList.forEach((t) => {
        if (t.name === this.quiz.theme.name) {
          this.themeSelected = t;
        }
      });
    }


    this.quizForm = this.formBuilder.group({
      name: [this.name, [Validators.maxLength(35), Validators.required]],
      theme: [this.themeSelected, [Validators.required]],
      difficulty: [this.difficulty, [Validators.required]]
    });
  }

  isWindowOpen() {
    return this.isCreateThemeOpen;
  }

  resetValues() {
    this.quizForm.reset();
    this.quizEmitter.emit({} as Quiz);
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

    if (this.quiz === undefined) {
      this.quiz = quiz;
    }

    this.quiz.name = quizName;
    this.quiz.themeId = theme.id;
    this.quiz.theme = theme;
    this.quiz.difficulty = diff;


    console.log(this.quiz);
    this.quizEmitter.emit(quiz);
  }

  openWindowsCreateTheme(b: boolean) {
    this.isCreateThemeOpen = !this.isCreateThemeOpen;
    this.isCreateThemeOpened.emit(b);
  }

  setSelectedTheme(theme: Theme) {
    this.themeSelected = theme;
    console.log(this.themeSelected);
  }

  updateQuizCreationService() {
    const quizName = this.quizForm.get('name').value;
    const theme = this.quizForm.get('theme').value;
    const diff = this.quizForm.get('difficulty').value;

    const isQuizNameEmpty = (quizName === undefined || quizName === '');
    const isThemeEmpty = (theme === undefined || theme === '');
    const isDifficultyEmpty = (diff === undefined || diff === '');

    console.log('quizEmpty : ' + isQuizNameEmpty);
    console.log('themeEmpty : ' + isThemeEmpty);
    console.log('diffEmpty : ' + isDifficultyEmpty);
    console.log('quizEmpty : ' + quizName);
    console.log('themeEmpty : ' + theme);
    console.log('diffEmpty : ' + diff);

    if (isQuizNameEmpty && isThemeEmpty && isDifficultyEmpty) {
      this.quizCreationStatusService.isQuizCreatedEmpty$.next(true);
    } else {
      this.quizCreationStatusService.isQuizCreatedEmpty$.next(false);
    }
  }
}
