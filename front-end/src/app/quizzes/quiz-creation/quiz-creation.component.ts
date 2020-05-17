import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {ThemesService} from '../../../services/themes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {QuizCreationStatusService} from '../../../services/quiz-creation-status.service';
import Swal from 'sweetalert2';

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
              private router: Router,
              private quizService: QuizService,
              private toasterService: ToasterService,
              private quizCreationStatusService: QuizCreationStatusService,
              private themesService: ThemesService) {

    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);

    if (id !== undefined && id !== null) {
      this.updateMode = true;
      this.quizService.getQuizData(id).subscribe((q) => {
        this.updateModeValueReceived = true;
        this.quizToCreate = q;
        quizCreationStatusService.isQuizCreatedEmpty$.next(false);
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

    // tslint:disable-next-line:max-line-length
    if (this.isQuestionListOpen && this.isCreateQuestionOpen) {

      Swal.fire({
        title: 'Attention votre question n\'est pas enregistrée !\nEtes-vous sûr de vouloir retourner dans général ?',
      })
        .then((willContinue) => {
          if (willContinue) {

            this.isGeneralOpen = true;
            this.isQuestionListOpen = false;
            console.log(this.quizToCreate);
          }
        });

    } else if (this.isQuestionListOpen && !this.isCreateQuestionOpen) {
      this.isGeneralOpen = true;
      this.isQuestionListOpen = false;
      console.log(this.quizToCreate);

    } else if (!this.isQuestionListOpen) {
      this.isGeneralOpen = true;
      this.isQuestionListOpen = false;
      console.log(this.quizToCreate);
    }
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
    this.quizToCreate.themeId = quiz.themeId.toString();
    this.quizToCreate.name = quiz.name;
    this.quizToCreate.difficulty = quiz.difficulty;

    this.openQuestion();
    console.log(this.quizToCreate);
  }

  createQuiz() {
    console.log(this.quizToCreate);
    this.isLoading = true;
    this.quizService.addQuiz(this.quizToCreate).subscribe((response) => {
      this.isLoading = false;
      if (response.status === 200 || response.status === 201) {
        console.log(response.body);
        this.quizService.quizzes.push(response.body);
        this.quizService.quizzes$.next(this.quizService.quizzes);
        this.toasterService.activateToaster(false, 'quiz créé', 2000);
        this.themesService.setThemes();
        this.goToThemeMenu();
      }
    }, error => {
      this.isLoading = false;
      if (error.status === 409) {
        this.toasterService.activateToaster(true, 'Ce quiz existe déjà !', 2000);

      } else {
        this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
      }
    });
  }

  goToThemeMenu() {
    if (this.quizToCreate.themeId !== undefined) {
      this.router.navigate(['/themes/' + this.quizToCreate.themeId]);
    }

    this.router.navigate(['/themes']);
  }


  deleteQuiz() {

    Swal.fire({
      title: 'Etes-vous sur de vouloir supprimer ce quiz ?',
    })
      .then((willContinue) => {
        if (willContinue) {
          this.quizService.deleteQuiz(this.quizToCreate);
          this.goToThemeMenu();
        }
      });
  }

  nbQuestions() {
    let nb = 0;

    this.quizToCreate.questions.forEach((question) => {
      if (question.deleted !== true) {
        nb++;
      }
    });

    return nb;
  }

  updateQuiz() {
    // console.log('UPDATE :');
    // console.log(this.quizToCreate);
    this.quizService.updateQuiz(this.quizToCreate).subscribe((response) => {
      this.isLoading = false;
      if (response.status === 200 || response.status === 201) {
        console.log(response.body);
        this.quizService.quizzes.push(response.body);
        this.quizService.quizzes$.next(this.quizService.quizzes);
        this.toasterService.activateToaster(false, 'quiz mis à jour', 2000);
        this.themesService.setThemes();
        this.goToThemeMenu();
      }
    }, error => {
      this.isLoading = false;
      this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
    });
    this.goToThemeMenu();
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
