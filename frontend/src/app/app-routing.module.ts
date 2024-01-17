/* eslint @typescript-eslint/typedef: 0 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { LoginComponent } from './core/pages/login/login.component';
import { loggedGuard } from './core/guards/logged.guard';
import { UserFormComponent } from './modules/users/pages/user-form/user-form.component';
import { notLoggedGuard } from './core/guards/not-logged.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [loggedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notLoggedGuard],
  },
  {
    path: 'register',
    component: UserFormComponent,
    canActivate: [notLoggedGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/users/users-routing.module').then(
        (m) => m.UsersRoutingModule
      ),
    canActivate: [loggedGuard],
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./modules/posts/posts-routing.module').then(
        (m) => m.PostsRoutingModule
      ),
    canActivate: [loggedGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
