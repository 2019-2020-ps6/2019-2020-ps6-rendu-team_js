import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserFormComponent} from './authentication/user-form/user-form.component';
import {AdminFormComponent} from './authentication/admin-form/admin-form.component';
import {PlayQuizComponent} from './play-quiz/play-quiz.component';
import {QuizResponseComponent} from './play-quiz/quiz-responses-list/quiz-response/quiz-response.component';
import {QuizResponsesListComponent} from './play-quiz/quiz-responses-list/quiz-responses-list.component';
import { MenuComponent } from './menu/menu.component';
import { MenuButtonComponent } from './menu/menu-button/menu-button.component';
import { ParametersComponent } from './parameters/parameters.component';
import {ResultComponent} from './play-quiz/result/result.component';
import {QuizPreviewComponent} from './quizzes/quiz-preview/quiz-preview.component';
import {QuizCreationComponent} from './quizzes/quiz-creation/quiz-creation.component';
import {QuizEditorComponent} from './quizzes/quiz-editor/quiz-editor.component';
import {StatsComponent} from './stats/stats.component';
import {ResidentsComponent} from './residents/residents.component';
import {QuizHeaderComponent} from './play-quiz/result/quiz-header/quiz-header.component';
import {QuestionResultComponent} from './play-quiz/result/quiz-result-list/question-result/question-result.component';
import {QuizResultListComponent} from './play-quiz/result/quiz-result-list/quiz-result-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuizInfoComponent } from './quizzies/quiz-info/quiz-info.component';



@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizPreviewComponent,
    HeaderComponent,
    QuizCreationComponent,
    QuizEditorComponent,
    QuestionListComponent,
    QuestionFormComponent,
    AdminFormComponent,
    QuizHeaderComponent,
    QuestionResultComponent,
    UserFormComponent,
    QuestionComponent,
    PlayQuizComponent,
    QuizResponseComponent,
    QuizResultListComponent,
    QuizResponsesListComponent,
    ResultComponent,
    PlayQuizComponent,
    MenuComponent,
    MenuButtonComponent,
    StatsComponent,
    ParametersComponent,
    ResidentsComponent,
    WelcomeComponent,
    QuizInfoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
