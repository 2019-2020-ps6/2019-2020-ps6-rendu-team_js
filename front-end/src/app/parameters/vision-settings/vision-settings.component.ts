import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vision-settings',
  templateUrl: './vision-settings.component.html',
  styleUrls: ['./vision-settings.component.scss']
})
export class VisionSettingsComponent implements OnInit {

  @Input() contrast: number;
  @Input() fontSize: number;
  @Input() font: string;

  constructor() { }

  ngOnInit() {
  }

}
