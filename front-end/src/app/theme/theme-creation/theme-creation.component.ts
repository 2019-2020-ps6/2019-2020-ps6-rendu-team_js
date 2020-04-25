import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {ThemesService} from '../../../services/themes.service';
import {Theme} from '../../../models/theme.model';
import {ToasterService} from '../../../services/toaster.service';

@Component({
  selector: 'app-theme-creation',
  templateUrl: './theme-creation.component.html',
  styleUrls: ['./theme-creation.component.scss']
})
export class ThemeCreationComponent implements OnInit {

  themeForm: FormGroup;
  colors = ['grey', 'orange', 'blue', 'green', 'yellow', 'brown', 'red'];
  selectedColor = this.colors[0];
  isLoading: boolean;

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  themeSelected: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor(private formBuilder: FormBuilder,
              private quizService: QuizService,
              private toasterService: ToasterService,
              private themesService: ThemesService) {

    this.isLoading = false;

    this.themeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
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
    // this.themesService.addTheme(themeToCreate);

    this.isLoading = true;

    this.themesService.addTheme(themeToCreate).subscribe((response) => {
      this.isLoading = false;
      if (response.status === 200 || response.status === 201) {
        console.log(response.body);
        this.themesService.themes.push(response.body);
        this.themesService.themes$.next(this.themesService.themes);
        this.toasterService.activateToaster(false, 'Thème crée', 2000);
        this.themeSelected.emit(response.body);
        this.backPressed();
      }

    }, error => {
      this.isLoading = false;
      if (error.status === 409) {
        this.toasterService.activateToaster(true, 'Ce thème existe déjà !', 2000);

      } else {
        this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);

      }
    });
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }

}
