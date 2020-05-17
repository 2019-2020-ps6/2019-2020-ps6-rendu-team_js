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
      reverseButtons: true,
      icon: 'warning',
      title: 'Etes-vous sur de vouloir supprimer cette question ?',
      confirmButtonText: 'Supprimer',
      confirmButtonColor: '#a20000',
      cancelButtonText: 'Retour',
      showCancelButton: true

    }).then((result) => {
        if (result.value) {
          this.question.deleted = true;
        }
      });
  }
}
