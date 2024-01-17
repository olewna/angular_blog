/* eslint @typescript-eslint/no-unnecessary-condition: 0 */
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryForm } from 'src/app/shared/models/CategoryForm.model';
import { Post } from 'src/app/shared/models/Post.model';
import { PostForm } from 'src/app/shared/models/PostForm.model';
import { PostFormService } from 'src/app/shared/services/post-form.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UsersService } from 'src/app/shared/services/users.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  public constructor(
    private location: Location,
    private postFormService: PostFormService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private userService: UsersService
  ) {}

  protected postForm: FormGroup<PostForm> = this.postFormService.postForm;
  protected isEditMode: boolean = false;
  protected message: string = '';

  public get categories(): FormArray<FormGroup<CategoryForm>> {
    return this.postForm.controls.categories as FormArray<
      FormGroup<CategoryForm>
    >;
  }

  public ngOnInit(): void {
    this.postForm.reset();
    this.postForm.controls.categories.controls = [];
    this.route.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.postService.getPostById(id).subscribe((res: Post) => {
          this.isEditMode = true;
          this.postForm.patchValue({
            id: res.id,
            title: res.title,
            author: res.author,
            body: res.body,
          });
          if (res.categories) {
            const categoryArr: FormArray<FormGroup<CategoryForm>> =
              this.postForm.get('categories') as FormArray<
                FormGroup<CategoryForm>
              >;
            res.categories.forEach((data: string) => {
              const categoryFormGroup: FormGroup<CategoryForm> =
                new FormGroup<CategoryForm>({
                  name: new FormControl<string | null>(''),
                });
              categoryFormGroup.patchValue({
                name: data,
              });
              categoryArr.push(categoryFormGroup);
            });
          }
        });
      }
    });
  }

  public addCategory(): void {
    this.postFormService.addCategory();
  }

  public removeCategory(id: number): void {
    this.postFormService.removeCategory(id);
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.postService.updatePost(this.postForm.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
        error: (err: HttpErrorResponse) => {
          this.message = err.error;
        },
      });
    } else {
      this.postForm.patchValue({
        author: this.userService.getWhoIsLogged(),
        id: uuid.v4(),
      });
      this.postService.createPost(this.postForm.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: (err: HttpErrorResponse) => {
          this.message = err.error;
        },
      });
    }
  }

  public goBack(): void {
    this.location.back();
  }
}
