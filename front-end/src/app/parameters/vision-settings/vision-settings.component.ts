import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-vision-settings',
  templateUrl: './vision-settings.component.html',
  styleUrls: ['./vision-settings.component.scss']
})
export class VisionSettingsComponent implements OnInit {

  @Input() contrast: number;
  @Input() fontSize: number;
  @Input() font: string;
  private fontForm: FormGroup;

  @Output() contrastSelected = new EventEmitter<number>();
  @Output() fontSizeSelected = new EventEmitter<number>();
  @Output() fontSelected = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fontForm = this.formBuilder.group({
      fontName: [this.font, [Validators.required]],
    });
  }

  contrastSelectedEmit(valeur) {
    this.contrastSelected.emit(valeur);
  }

  fontSizeSelectedEmit(valeur) {
    this.fontSizeSelected.emit(valeur);
  }

  fontSelectedEmit() {
    if (this.font !== this.fontForm.get('fontName').value) {
      this.fontSelected.emit(this.fontForm.get('fontName').value);
    }
  }
}
