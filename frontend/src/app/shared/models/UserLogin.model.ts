import { FormControl } from '@angular/forms';

export interface UserLogin {
  readonly login: FormControl<string | null>;
  readonly password: FormControl<string | null>;
}
