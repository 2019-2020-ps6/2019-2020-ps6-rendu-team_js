import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Theme} from '../../models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  private editModeActivated = false;
  private isWindowOpened = false;

  private themeSelected: Theme;

  constructor(private authServices: AuthService) { }

  ngOnInit() {
  }

  editModeActive(): boolean {
    return this.editModeActivated;
  }

  isWindowOpen() {
    return this.isWindowOpened;
  }
}
