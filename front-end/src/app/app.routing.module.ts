import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizEditorComponent } from './quizzes/quiz-editor/quiz-editor.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {PlayQuizComponent} from './play-quiz/play-quiz.component';
import {MenuComponent} from './menu/menu.component';
import {StatsComponent} from './stats/stats.component';
import {ParametersComponent} from './parameters/parameters.component';
import {QuizCreationComponent} from './quizzes/quiz-creation/quiz-creation.component';
import {ResidentsComponent} from './residents/residents.component';

const routes: Routes = [
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'play', component: PlayQuizComponent},
    {path: 'stats', component: StatsComponent},
    {path: 'parameters', component: ParametersComponent},
    {path: 'quiz-creation', component: QuizCreationComponent},
    {path: 'residents', component: ResidentsComponent},
    {path: 'quiz-editor/:id', component: QuizEditorComponent},
    { path: '**', redirectTo: '/quiz-list', pathMatch: 'full' }, // path ** means every page
    // { path: '', redirectTo: '/quiz-list', pathMatch: 'full' }, // path empty means nothing
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
