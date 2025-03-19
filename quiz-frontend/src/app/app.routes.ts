import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { PlayQuizComponent } from './pages/play-quiz/play-quiz.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CommentsHistoryComponent } from './pages/comments-history/comments-history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'play-quiz/:id', component: PlayQuizComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'comments-history', component: CommentsHistoryComponent },
];
