import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  themes: Theme[];


  constructor(private themesService: ThemesService) {
  }

  ngOnInit() {
    this.themesService.themes$.subscribe((t) => {
      this.themes = t;
    });
  }

}
