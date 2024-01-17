import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserOptionsComponent } from './pages/user-options/user-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserFormComponent, UserOptionsComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule],
})
export class UsersModule {}
