import { FormControl } from '@angular/forms';

export interface CategoryForm {
  readonly name: FormControl<string | null>;
}
