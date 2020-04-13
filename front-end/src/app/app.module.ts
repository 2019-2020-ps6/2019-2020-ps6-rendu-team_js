import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import {StatisticsComponent} from './statistics/statistics.component';
import {ResidentsComponent} from './residents/residents.component';
import {QuizHeaderComponent} from './play-quiz/result/quiz-header/quiz-header.component';
import {QuestionResultComponent} from './play-quiz/result/quiz-result-list/question-result/question-result.component';
import {QuizResultListComponent} from './play-quiz/result/quiz-result-list/quiz-result-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuizInfoComponent } from './quizzes/quiz-info/quiz-info.component';
import { StatisticsResidentsComponent } from './residents/statistics-residents/statistics-residents.component';
import { QuizzesStatisticsComponent } from './residents/statistics-residents/quizzes-statistics/quizzes-statistics.component';
import { GlobalStatisticsComponent } from './residents/statistics-residents/global-statistics/global-statistics.component';
import { CreateAccountComponent } from './residents/create-account/create-account.component';
import { QuizStatisticsComponent } from './residents/statistics-residents/quizzes-statistics/quiz-statistics/quiz-statistics.component';
import { VisionSettingsComponent } from './parameters/vision-settings/vision-settings.component';
import { MoteurSettingsComponent } from './parameters/moteur-settings/moteur-settings.component';
import { ResidentsListComponent } from './residents/residents-list/residents-list.component';
import { ResidentsItemComponent } from './residents/residents-list/residents-item/residents-item.component';
import { ResidentsInformationsComponent } from './residents/residents-informations/residents-informations.component';
import { ConfirmParamCopyComponent } from './residents/confirm-param-copy/confirm-param-copy.component';
import { HelpComponent } from './help/help.component';
import { ThemeComponent } from './theme/theme.component';
import { ThemeListComponent } from './theme/theme-list/theme-list.component';
import { ThemeItemComponent } from './theme/theme-item/theme-item.component';
import { QuizInprogressComponent } from './quizzes/quiz-inprogress/quiz-inprogress.component';



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
    MenuComponent,
    MenuButtonComponent,
    StatisticsComponent,
    ParametersComponent,
    ResidentsComponent,
    WelcomeComponent,
    QuizInfoComponent,
    StatisticsResidentsComponent,
    QuizzesStatisticsComponent,
    GlobalStatisticsComponent,
    QuizStatisticsComponent,
    CreateAccountComponent,
    VisionSettingsComponent,
    MoteurSettingsComponent,
    ResidentsListComponent,
    ResidentsItemComponent,
    ResidentsInformationsComponent,
    HelpComponent,
    ThemeComponent,
    ThemeListComponent,
    ThemeItemComponent,
    QuizInprogressComponent,
    ConfirmParamCopyComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
