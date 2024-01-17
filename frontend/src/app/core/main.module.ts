import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PostsModule } from '../modules/posts/posts.module';
import { UsersModule } from '../modules/users/users.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    UsersModule,
    PostsModule,
  ],
  exports: [FooterComponent, NavbarComponent],
})
export class MainModule {}
