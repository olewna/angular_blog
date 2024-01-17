import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostForm } from '../models/PostForm.model';
import * as uuid from 'uuid';
import { CategoryForm } from '../models/CategoryForm.model';

@Injectable({
  providedIn: 'root',
})
export class PostFormService {
  public postForm: FormGroup<PostForm> = new FormGroup<PostForm>({
    id: new FormControl<string>(uuid.v4()),
    title: new FormControl<string>('', [Validators.required]),
    body: new FormControl<string>('', [Validators.required]),
    author: new FormControl<string>(''),
    categories: new FormArray<FormGroup<CategoryForm>>([]),
  });

  public addCategory(): void {
    this.postForm.controls.categories.push(
      new FormGroup<CategoryForm>({
        name: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(2),
        ]),
      })
    );
  }

  public removeCategory(id: number): void {
    this.postForm.controls.categories.removeAt(id);
  }
}
