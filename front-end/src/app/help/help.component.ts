import { Component, OnInit } from '@angular/core';
import {HelpService} from '../../services/help.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private helpService: HelpService) { }

  ngOnInit() {
  }

  deactivateWindow() {
    this.helpService.activateWindow(false);
  }
}
