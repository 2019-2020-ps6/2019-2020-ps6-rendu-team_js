import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import {PlayQuizComponent} from './play-quiz/play-quiz.component';
import {MenuComponent} from './menu/menu.component';
import {ParametersComponent} from './parameters/parameters.component';
import {ResultComponent} from './play-quiz/result/result.component';
import {StatsComponent} from './stats/stats.component';
import {QuizCreationComponent} from './quizzes/quiz-creation/quiz-creation.component';
import {ResidentsComponent} from './residents/residents.component';
import {QuizEditorComponent} from './quizzes/quiz-editor/quiz-editor.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {UserFormComponent} from './authentication/user-form/user-form.component';
import {AdminFormComponent} from './authentication/admin-form/admin-form.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {NotAuthGuardService} from '../services/not-auth-guard.service';

const routes: Routes = [
    // add the AuthGuardService if the user can go to the page if he's connected
    // add the NotAuthGuardService if the user can go to the page if he's not connected
    {path: 'quiz-list',  canActivate: [AuthGuardService], component: QuizListComponent},
    {path: 'welcome', canActivate: [NotAuthGuardService], component: WelcomeComponent},
    {path: 'play/:id', canActivate: [AuthGuardService], component: PlayQuizComponent},
    {path: 'stats', canActivate: [AuthGuardService], component: StatsComponent},
    {path: 'result', canActivate: [AuthGuardService], component: ResultComponent},
    {path: 'parameters', canActivate: [AuthGuardService], component: ParametersComponent},
    {path: 'quiz-creation', canActivate: [AuthGuardService], component: QuizCreationComponent},
    {path: 'residents', canActivate: [AuthGuardService], component: ResidentsComponent},
    {path: 'quiz-editor/:id', canActivate: [AuthGuardService], component: QuizEditorComponent},
    {path: 'login/user', canActivate: [NotAuthGuardService], component: UserFormComponent},
    {path: 'login/admin', canActivate: [NotAuthGuardService], component: AdminFormComponent},
    {path: '**', redirectTo: '/quiz-list', canActivate: [NotAuthGuardService], pathMatch: 'full' }, // path ** means every page
    {path: '', redirectTo: '/quiz-list', canActivate: [NotAuthGuardService], pathMatch: 'full' }, // path empty means nothing

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
