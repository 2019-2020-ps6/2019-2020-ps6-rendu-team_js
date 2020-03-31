import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-vision-settings',
  templateUrl: './vision-settings.component.html',
  styleUrls: ['./vision-settings.component.scss']
})
export class VisionSettingsComponent implements OnInit {

  @Input() contrast: number;
  @Input() fontSize: number;
  @Input() font: string;

  @Output() contrastSelected = new EventEmitter<number>();
  @Output() fontSizeSelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  contrastSelectedEmit(valeur) {
    this.contrastSelected.emit(valeur);
  }

  fontSizeSelectedEmit(valeur) {
    this.fontSizeSelected.emit(valeur);
  }

}
