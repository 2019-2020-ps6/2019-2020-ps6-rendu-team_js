import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Answer} from '../../../models/question.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  @Output()
  isBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  backPressed() {
    this.isBackPressed.emit(true);
  }

}
