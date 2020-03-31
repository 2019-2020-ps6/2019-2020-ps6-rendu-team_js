import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-moteur-settings',
  templateUrl: './moteur-settings.component.html',
  styleUrls: ['./moteur-settings.component.scss']
})
export class MoteurSettingsComponent implements OnInit {

  @Input() tailleSelection: number;

  constructor() { }

  ngOnInit() {
  }

}
