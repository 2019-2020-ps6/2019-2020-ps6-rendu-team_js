import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../../../../models/result.model';
import {ActivatedRoute} from '@angular/router';
import {ResultService} from '../../../../../services/result.service';
import {Answer, Question} from '../../../../../models/question.model';

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.scss']
})
export class QuestionResultComponent implements OnInit {

  // @Input() data: ResultQuestion;
  @Input() answerId: number;
  @Input() correctAnswerId: number;
  @Input() questionScore: number;
  @Input() questionId: number;
  @Input() index: number;
  @Input() quizId: string;

  // probléme avec l'index : arrive pas a le recup + finir de recup la question et afficher les réponse label
  private question: Question;
  private answerSelected: Answer;
  private answerCorrect: Answer;

  constructor(private route: ActivatedRoute, private resultService: ResultService) {
    this.resultService.answerSelected$.subscribe((answer) => this.answerSelected = answer); // set class var quiz
    this.resultService.questionSelected$.subscribe((question) => this.question = question); // set class var quiz
    this.resultService.correctAnswerSelected$.subscribe((answer) => this.answerCorrect = answer); // set class var quiz
  }

  ngOnInit() {
    this.resultService.setSelectedQuestion(this.quizId, String(this.questionId));
    console.log('>>>' + this.answerId);
    this.resultService.setSelectedAnswer(this.quizId, String(this.questionId), String(this.answerId));
    console.log('>>>' + this.answerSelected);

    if (this.correctAnswerId) {
      this.resultService.setSelectedCorrectAnswer(this.quizId, String(this.questionId), String(this.correctAnswerId));
    } else {
      /*
      this.answerCorrect = new class implements Answer {
        isCorrect = true;
        type = '';
        value = '';
      };*/
    }
  }
}
