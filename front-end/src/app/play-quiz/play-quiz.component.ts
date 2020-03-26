import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {Answer, Question} from '../../models/question.model';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})

export class PlayQuizComponent implements OnInit {

  // public quiz: Quiz = null;  //syntax to assign & define on same statement
  public quiz: Quiz;
  public questionNumber: number;
  public userAnswers: Answer[];

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz); // set class var quiz
}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    // this.questionNumber = +this.route.snapshot.paramMap.get('questionNumber');  // +in front of string cast string to int

    this.questionNumber = 0;  // initialize vars
    this.userAnswers = [];
  }

  addToUserAnswers(answer: Answer) {
    console.log('DEBUG', answer);
    // this.userAnswers.push(answer); // TODO redo push

    this.questionNumber++;
  }

  isOver() {
    if (this.questionNumber >= this.quiz.questions.length) {
      // this.router.navigate(['/play/:id/result'])
      return true;
    } else {
      return false;
    }
  }

}
