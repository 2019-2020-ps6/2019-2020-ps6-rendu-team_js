import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../../models/settings.model';
import {AuthService} from '../../../services/auth.service';
import {SettingsService} from '../../../services/settings.service';
import {ToasterService} from '../../../services/toaster.service';
import {Router} from '@angular/router';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.scss']
})
export class ThemeEditComponent implements OnInit {

  @Input()
  theme: Theme;

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();


  private isEditNameOpen: boolean;

  private isDeleteButtonPressed: boolean;

  private message: string;
  private isErrorMessage: boolean;

  public nameForm: FormGroup;
  public colorForm: FormGroup;

  settings: Settings;

  colors = [
    '#650000', '#651400', '#652200',
    '#654600', '#655700', '#656500', '#596500',
    '#456500', '#376500', '#236500', '#006515', '#006528', '#00653D',
    '#006551', '#006565', '#005165', '#003D65',
    '#002E65', '#001865', '#170065', '#250065',
    '#370065', '#480065', '#600065', '#65005A',
    '#1B2631', '#17202A'];

  selectedColor = this.colors[0];
  isLoading: boolean;

  constructor(private authServices: AuthService,
              private settingsService: SettingsService,
              private themeService: ThemesService,
              private formBuilder: FormBuilder,
              private toasterService: ToasterService,
              private router: Router) {
    this.isEditNameOpen = false;
  }

  ngOnInit() {
    this.isDeleteButtonPressed = false;
    this.selectedColor = this.theme.color;
    console.log(this.theme);
    this.nameForm = this.formBuilder.group({
      themeName: [this.theme.name, [Validators.maxLength(15), Validators.required]],
    });

    this.colorForm = this.formBuilder.group({
      color: [this.selectedColor, [Validators.required]],
    });

    this.isErrorMessage = false;
    this.message = '';
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }

  deleteButtonPressed() {
    this.isLoading = true;
    if (this.theme.nbQuiz > 0) {
      this.toasterService.activateToaster(true, 'il ne doit pas y avoir de quiz dans ce thème pour pouvoir le supprimer !', 4000);
      this.isLoading = false;
    } else {

      if (confirm('Etes-vous sur de vouloir supprimer ce thème ?')) {
        this.themeService.delete(this.theme).subscribe((response) => {
          if (response.status === 204) {
            this.toasterService.activateToaster(false, 'Thème supprimé !', 2000);
            this.themeService.setThemes();
            this.backPressed();

            this.isLoading = false;
          } else {
            this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
            this.isLoading = false;
          }
        }, error => {
          this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
          this.isLoading = false;
        });
      }
    }
  }


  hasChangeBeenDone(): boolean {

    if (this.isLoading) {
      return false;
    }

    if (this.isEditNameOpen) {
      return this.nameForm.valid;
    }

    return this.selectedColor !== this.theme.color;
  }


  saveButtonPressed() {

    this.isLoading = true;

    if (this.isEditNameOpen || this.selectedColor !== this.theme.color) {
      const themeName = this.nameForm.get('themeName').value;
      const themeColor = this.selectedColor;

      this.themeService.updateThemeName(this.theme, themeName, themeColor).subscribe((response => {
        if (response.status === 200) {
          this.isEditNameOpen = false;
          this.toasterService.activateToaster(false, 'Nom de thème enregistré !', 2000);
          this.isLoading = false;

        } else {
          this.toasterService.activateToaster(true, 'Une erreur est survenue, réessayer plus tard...', 2000);
          this.isLoading = false;
        }
      }));
    }
  }

  closeNameEdit() {
    this.isEditNameOpen = false;
  }
}
