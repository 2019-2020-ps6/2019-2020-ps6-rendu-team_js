import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {PlayQuizComponent} from './play-quiz/play-quiz.component';
import {ParametersComponent} from './parameters/parameters.component';
import {ResultComponent} from './play-quiz/result/result.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {QuizCreationComponent} from './quizzes/quiz-creation/quiz-creation.component';
import {ResidentsComponent} from './residents/residents.component';
import {QuizEditorComponent} from './quizzes/quiz-editor/quiz-editor.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {UserFormComponent} from './authentication/user-form/user-form.component';
import {AdminFormComponent} from './authentication/admin-form/admin-form.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {NotAuthGuardService} from '../services/not-auth-guard.service';
import {AuthGuardAdminService} from '../services/auth-guard-admin.service';
import {StatisticsResidentsComponent} from './residents/statistics-residents/statistics-residents.component';
import {QuizInfoComponent} from './quizzes/quiz-info/quiz-info.component';
import {ThemeComponent} from './theme/theme.component';
import {ThemeCreationComponent} from './theme/theme-creation/theme-creation.component';
import {QuestionFormComponent} from './questions/question-form/question-form.component';
import {QuestionCreationComponent} from './questions/question-creation/question-creation.component';

const routes: Routes = [
  // add the AuthGuardService if the user can go to the page if he's connected
  // add the NotAuthGuardService if the user can go to the page if he's not connected
  {path: 'welcome', canActivate: [NotAuthGuardService], component: WelcomeComponent},
  {path: 'play/:id', canActivate: [AuthGuardService], component: PlayQuizComponent},
  {path: 'stats', canActivate: [AuthGuardService], component: StatisticsComponent},
  {path: 'result/:resId', canActivate: [AuthGuardService], component: ResultComponent},
  {path: 'parameters', canActivate: [AuthGuardService], component: ParametersComponent},
  {path: 'quiz-creation', canActivate: [AuthGuardAdminService], component: QuizCreationComponent},
  {path: 'theme-creation', canActivate: [AuthGuardAdminService], component: ThemeCreationComponent},
  {path: 'question-creation/:id', canActivate: [AuthGuardAdminService], component: QuestionCreationComponent},
  {path: 'question-edit/:id', canActivate: [AuthGuardAdminService], component: QuestionFormComponent},
  {path: 'residents', canActivate: [AuthGuardAdminService], component: ResidentsComponent},
  {path: 'admin/:id/stats', canActivate: [AuthGuardAdminService], component: StatisticsResidentsComponent},
  {path: 'quiz-editor/:id', canActivate: [AuthGuardService], component: QuizEditorComponent},
  {path: 'quiz-info/:id', canActivate: [AuthGuardService], component: QuizInfoComponent},
  {path: 'login/user', canActivate: [NotAuthGuardService], component: UserFormComponent},
  {path: 'login/admin', canActivate: [NotAuthGuardService], component: AdminFormComponent},
  {path: 'themes', canActivate: [AuthGuardService], component: ThemeComponent},
  {path: 'themes/:id', canActivate: [AuthGuardService], component: QuizListComponent},
  {path: '**', redirectTo: '/themes', canActivate: [NotAuthGuardService], pathMatch: 'full'}, // path ** means every page
  {path: '', redirectTo: '/themes', canActivate: [NotAuthGuardService], pathMatch: 'full'}, // path empty means nothing
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
