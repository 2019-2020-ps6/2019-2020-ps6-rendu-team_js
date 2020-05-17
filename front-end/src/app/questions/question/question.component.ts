import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: 'Etes-vous sur de vouloir supprimer cette question ?',

    }).then((willContinue) => {
        if (willContinue) {
          this.question.deleted = true;
        }
      });
  }
}
