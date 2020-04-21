import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {
  // private themeList: Theme[];
  // private themeList$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.themeList);

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private themesService: ThemesService) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
      difficulty: ['']
    });


    // this.themesService.getThemes(((t) => {
    // this.themeList = t;
    // }));
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
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
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }

  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;

    this.quizService.addQuiz(quizToCreate);
  }

}
