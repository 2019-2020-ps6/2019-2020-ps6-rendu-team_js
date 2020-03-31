import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-moteur-settings',
  templateUrl: './moteur-settings.component.html',
  styleUrls: ['./moteur-settings.component.scss']
})
export class MoteurSettingsComponent implements OnInit {

  @Input() tailleSelection: number;
  @Output() tailleSelectionSelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  tailleSelectionSelectedEmit(valeur) {
    this.tailleSelectionSelected.emit(valeur);
  }

}
