import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {ThemesService} from '../../../services/themes.service';
import {Theme} from '../../../models/theme.model';

@Component({
  selector: 'app-theme-creation',
  templateUrl: './theme-creation.component.html',
  styleUrls: ['./theme-creation.component.scss']
})
export class ThemeCreationComponent implements OnInit {

  public themeForm: FormGroup;

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public themesService: ThemesService) {
    this.themeForm = this.formBuilder.group({
      name: [''],
      color: ['']
    });
  }

  ngOnInit() {
  }

  addTheme() {
    // We retrieve here the theme object from the themeForm and we cast the type "as Theme".
    const themeToCreate: Theme = this.themeForm.getRawValue() as Theme;

    this.themesService.addTheme(themeToCreate);
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }

}
