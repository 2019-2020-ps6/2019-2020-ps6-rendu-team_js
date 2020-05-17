import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

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

    swal({
      className: 'swal-wide',
      title: 'Etes-vous sur de vouloir supprimer cette question ?',
      icon: '../../../assets/images/warn.svg',
      buttons: ['Annuler', 'Confirmer'],
      dangerMode: false,
      closeOnClickOutside: false,
    })
      .then((willContinue) => {
        if (willContinue) {
          this.question.deleted = true;
        }
      });
  }
}
