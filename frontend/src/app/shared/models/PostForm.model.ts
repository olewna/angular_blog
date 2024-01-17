import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CategoryForm } from './CategoryForm.model';

export interface PostForm {
  readonly id: FormControl<string | null>;
  readonly title: FormControl<string | null>;
  readonly body: FormControl<string | null>;
  readonly author: FormControl<string | null>;
  readonly categories: FormArray<FormGroup<CategoryForm>>;
}
