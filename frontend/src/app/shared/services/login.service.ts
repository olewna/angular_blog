import { Injectable } from '@angular/core';
import { UserLogin } from '../models/UserLogin.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginForm: FormGroup<UserLogin> = new FormGroup<UserLogin>({
    login: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
}
