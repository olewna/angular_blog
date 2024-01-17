import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/core/pages/not-found/not-found.component';
import { UserOptionsComponent } from './pages/user-options/user-options.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
  },
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: UserOptionsComponent,
  },
  {
    path: 'edit/:id',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
