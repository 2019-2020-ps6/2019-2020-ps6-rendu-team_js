import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Question} from 'src/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  isCreateQuestionOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  private editingQuestion = false;
  private questionToEdit: Question;
  private indexQuestionBeingEdited: number;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    if (this.quiz.questions.length === 0) {
      this.closeQuestionCreation(false);
    }
  }

  deleteQuestion(question: Question) {
    const index = this.quiz.questions.indexOf(question);
    if (index > -1) {
      this.quiz.questions.splice(index, 1);
      if (this.quiz.questions.length === 0) {
        this.openQuestion(undefined, undefined);
      }
    }
  }

  openQuestion(question: Question, index: number) {
    this.closeQuestionCreation(false);
    this.questionToEdit = question;
    this.indexQuestionBeingEdited = index;
  }

  questionId(q: Question) {
    let index = this.quiz.questions.indexOf(q);

    if (!q) {
      index = this.quiz.questions.length + 1;
      return index;

    } else {
      return (index > -1) ? index + 1 : 1;
    }
  }

  addQuestion(q: Question) {
    if (this.indexQuestionBeingEdited !== undefined) {

      if (this.indexQuestionBeingEdited <= this.quiz.questions.length) {
        this.quiz.questions[this.indexQuestionBeingEdited] = q;

      } else {
        this.quiz.questions.push(q);
      }

    } else {
      this.quiz.questions = [q];
    }

    this.closeQuestionCreation(true);
  }

  closeQuestionCreation(b: boolean) {
    this.editingQuestion = !b;
    this.isCreateQuestionOpen.emit(this.editingQuestion);
    console.log('is edit open : ' + this.editingQuestion);
  }

}
