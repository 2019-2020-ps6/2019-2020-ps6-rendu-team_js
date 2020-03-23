import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz-preview/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizCreationComponent } from './quizzes/quiz-creation/quiz-creation.component';
import { QuizEditorComponent } from './quizzes/quiz-editor/quiz-editor.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LogoComponent} from './authentication/firstpage/logo.component';
import {UserFormComponent} from './authentication/user-form/user-form.component';
import {AdminFormComponent} from './authentication/admin-form/admin-form.component';
import {PlayQuizComponent} from './play-quiz/play-quiz.component';
import {QuizResponseComponent} from './play-quiz/quiz-responses-list/quiz-response/quiz-response.component';
import {QuizResponsesListComponent} from './play-quiz/quiz-responses-list/quiz-responses-list.component';
import { MenuComponent } from './menu/menu.component';
import { MenuButtonComponent } from './menu/menu-button/menu-button.component';
import { StatsComponent } from './stats/stats.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ResidentsComponent } from './residents/residents.component';



@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizCreationComponent,
    QuizEditorComponent,
    QuestionListComponent,
    QuestionFormComponent,
    AuthenticationComponent,
    AdminFormComponent,
    UserFormComponent,
    LogoComponent,
    QuestionComponent,
    PlayQuizComponent,
    QuizResponseComponent,
    QuizResponsesListComponent,
    PlayQuizComponent,
    MenuComponent,
    MenuButtonComponent,
    StatsComponent,
    ParametersComponent,
    ResidentsComponent
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
