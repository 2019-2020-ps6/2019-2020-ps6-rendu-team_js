import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    if (confirm('Etes-vous sur de vouloir supprimer cette question ?')) {
      this.question.deleted = true;
    }
  }
}
