import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemesService} from '../../../services/themes.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  private theme: Theme = {name: ' '} as Theme;
  private quizList: Quiz[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private themesService: ThemesService,
              private quizService: QuizService) {



    this.themesService.themeSelected$.subscribe((t) => {
      this.theme = t;
      this.quizService.setQuizzesFromThemeId(t.id);
    });

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit() {
    const themeId = this.route.snapshot.paramMap.get('id');
    this.themesService.setThemeSelectedFromId(themeId);

  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  QuizEditor(quiz: Quiz) {
    this.router.navigate(['/quiz-editor-preview/' + quiz.name]);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }
}
