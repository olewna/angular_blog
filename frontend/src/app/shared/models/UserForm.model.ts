import { FormControl } from '@angular/forms';

export interface UserForm {
  readonly id: FormControl<string>;
  readonly login: FormControl<string>;
  readonly password: FormControl<string>;
  readonly confirmPassword: FormControl<string>;
  readonly email: FormControl<string>;
}
