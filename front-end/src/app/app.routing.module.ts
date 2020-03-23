import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizEditorComponent } from './quizzes/quiz-editor/quiz-editor.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {PlayQuizComponent} from './play-quiz/play-quiz.component';

const routes: Routes = [
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'play', component: PlayQuizComponent},
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
