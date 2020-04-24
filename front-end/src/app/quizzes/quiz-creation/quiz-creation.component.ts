import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {ThemesService} from '../../../services/themes.service';
@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {


  isQuestionListOpen: boolean;
  isGeneralOpen: boolean;

  isLoading: boolean;

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
              private  quizService: QuizService,
              private themesService: ThemesService) {

    this.isLoading = false;
    this.isQuestionListOpen = false;
    this.isGeneralOpen = true;


  }

  ngOnInit() {

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
