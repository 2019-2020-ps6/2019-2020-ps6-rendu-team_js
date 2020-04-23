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

  themeForm: FormGroup;
  colors = ['grey', 'orange', 'blue', 'green', 'yellow', 'brown', 'red'];
  selectedColor = this.colors[0];

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private quizService: QuizService,
              private themesService: ThemesService) {

    this.themeForm = this.formBuilder.group({
      name: [''],
      color: ['']
    });
  }

  ngOnInit() {
  }

  addTheme() {
    // We retrieve here the theme object from the themeForm and we cast the type "as Theme".
    const name = this.themeForm.get('name').value;
    const color = this.themeForm.get('color').value;

    const themeToCreate = {name, color, nbQuiz: 0} as Theme;

    console.log(themeToCreate);
    this.themesService.addTheme(themeToCreate);
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }

}
