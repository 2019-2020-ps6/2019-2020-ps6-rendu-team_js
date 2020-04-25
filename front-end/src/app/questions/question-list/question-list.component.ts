import {Component, OnInit, Input} from '@angular/core';
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

  private editingQuestion = false;
  private questionToEdit: Question;
  private indexQuestionBeingEdited: number;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    console.log(this.quiz.questions.length);

    if (this.quiz.questions.length === 0) {
      this.editingQuestion = true;
    }
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
  }

  openQuestion(question: Question, index: number) {
    this.editingQuestion = true;
    this.questionToEdit = question;
    this.indexQuestionBeingEdited = index;
  }

  questionId(q: Question) {
    const index = this.quiz.questions.indexOf(q);
    return (index > -1) ? index + 1 : 1;
  }

  addQuestion(q: Question) {
    if (!this.quiz.questions) {
      if (this.indexQuestionBeingEdited) {
        this.quiz.questions[this.indexQuestionBeingEdited] = q;
      } else {
        console.log('error index edit/create question !!!');
      }
    } else {
      this.quiz.questions = [q];
    }

    this.editingQuestion = false;
  }
}
