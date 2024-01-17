import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './pages/details/details.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailsComponent, PostFormComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class PostsModule {}
