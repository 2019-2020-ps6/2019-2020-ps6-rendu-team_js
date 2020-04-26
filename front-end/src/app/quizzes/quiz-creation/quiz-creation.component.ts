import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {ThemesService} from '../../../services/themes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {

  updateMode = false;
  updateModeValueReceived = false;

  isQuestionListOpen = false;
  isCreateQuestionOpen = false;
  isGeneralOpen = true;

  isLoading = false;

  quizToCreate: Quiz;

  emptyQuiz = {
    name: '',
    themeId: '',
    questions: [],
    nbQuestions: 0,
    difficulty: '',
  } as Quiz;

  isWindowOpen: boolean;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private  quizService: QuizService,
              private themesService: ThemesService) {

    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);

    if (id !== undefined && id !== null) {
      this.updateMode = true;
      this.quizService.getQuizData(id).subscribe((q) => {
        this.updateModeValueReceived = true;
        this.quizToCreate = q;
        console.log(this.quizToCreate);
      });
    }
  }

  ngOnInit() {
    this.isLoading = false;
    this.isQuestionListOpen = false;
    this.isGeneralOpen = true;

  }


  openGeneral() {
    this.isGeneralOpen = true;
    this.isQuestionListOpen = false;
    console.log(this.quizToCreate);
  }

  openQuestion() {
    if (this.isQuestionWindowAllowed()) {
      this.isGeneralOpen = false;
      this.isQuestionListOpen = true;
    }

    console.log(this.quizToCreate);
  }

  isQuestionWindowAllowed() {
    return this.quizToCreate && this.quizToCreate.name !== '' && this.quizToCreate.difficulty !== ''
      && this.quizToCreate.theme !== undefined;
  }

  receiveQuiz(quiz: Quiz) {
    if (!this.quizToCreate) {
      this.quizToCreate = this.emptyQuiz;
    }
    this.quizToCreate.theme = quiz.theme;
    this.quizToCreate.themeId = quiz.themeId;
    this.quizToCreate.name = quiz.name;
    this.quizToCreate.difficulty = quiz.difficulty;

    this.openQuestion();
    console.log(this.quizToCreate);
  }

  deleteQuiz() {

  }

  createQuiz() {

  }

  updateQuiz() {

  }

  isBottomContainerOpenEditMode(): boolean {

    if (this.isQuestionListOpen !== undefined && this.isCreateQuestionOpen !== undefined && this.updateMode !== undefined) {
      return this.isQuestionListOpen && !this.isCreateQuestionOpen && this.updateMode;

    } else {
      return false;
    }
  }

  isBottomContainerOpenCreateMode(): boolean {
    // tslint:disable-next-line:max-line-length
    if (this.isQuestionListOpen !== undefined && this.isCreateQuestionOpen !== undefined && this.updateMode !== undefined && this.quizToCreate !== undefined && this.quizToCreate.questions !== undefined && this.quizToCreate.questions.length !== 0) {
      return this.isQuestionListOpen && !this.isCreateQuestionOpen && !this.updateMode;

    } else {
      return false;
    }
  }
}
