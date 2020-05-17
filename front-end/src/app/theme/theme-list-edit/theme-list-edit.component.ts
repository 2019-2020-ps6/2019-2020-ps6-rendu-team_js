import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';

@Component({
  selector: 'app-theme-list-edit',
  templateUrl: './theme-list-edit.component.html',
  styleUrls: ['./theme-list-edit.component.scss']
})
export class ThemeListEditComponent implements OnInit {

  themes: Theme[];

  isWindowThemeOpened = false;
  themeSelected: Theme;

  @Output()
  windowOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  themeSelectedEmitter: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor(private themesService: ThemesService) {
    this.themesService.setThemes();

    this.themesService.themes$.subscribe((t) => {
      this.themes = t;
    });
  }

  ngOnInit() {

  }

  openWindowThemeEdit(theme: Theme) {
    this.themeSelected = theme;
    this.isWindowThemeOpened = true;
    this.windowOpened.next(true);
    this.themeSelectedEmitter.next(theme);
  }
}
