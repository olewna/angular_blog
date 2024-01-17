import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/core/pages/not-found/not-found.component';
import { DetailsComponent } from 'src/app/modules/posts/pages/details/details.component';
import { PostFormComponent } from './pages/post-form/post-form.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
  },
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: DetailsComponent,
  },
  {
    // TODO
    path: 'details/edit/:id',
    component: PostFormComponent,
  },
  {
    path: 'add',
    component: PostFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
