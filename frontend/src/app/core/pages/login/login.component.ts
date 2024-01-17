import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/shared/models/UserLogin.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/User.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public constructor(
    private userService: UsersService,
    private router: Router,
    private loginService: LoginService
  ) {}

  protected loginForm: FormGroup<UserLogin> = this.loginService.loginForm;
  protected errorMsg: string = '';

  public login(): void {
    this.userService.getUsers().subscribe({
      next: (res: User[]) => {
        const user: User | undefined = res.find(
          (u: User) =>
            u.login === this.loginForm.controls.login.value &&
            u.password === this.loginForm.controls.password.value
        );
        if (user) {
          this.userService.logIn(user);
          this.router.navigate(['home']);
          this.loginForm.reset();
        } else {
          this.errorMsg = 'Błędne dane logowania!';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMsg = error.error;
      },
    });
  }

  public goToRegister(): void {
    this.router.navigate(['register']);
  }
}
