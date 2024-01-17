import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserForm } from 'src/app/shared/models/UserForm.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { passwordConfirmValidator } from 'src/app/shared/directives/password-confirm.directive';
import { v4 as uuid } from 'uuid';
import { Location } from '@angular/common';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router,
    private location: Location
  ) {}

  protected userForm!: FormGroup<UserForm>;
  protected isEditMode: boolean = false;
  protected confirmPassword: string = '';
  protected message: string = '';

  public ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        id: [uuid().toString()],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        login: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [passwordConfirmValidator],
      }
    );

    this.route.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.userService.getUserById(id).subscribe((res: User) => {
          this.isEditMode = true;
          this.userForm.patchValue(res);
        });
      }
    });
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.userService.updateUser(this.userForm.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['user', 'details', this.userService.getId()]);
        },
        error: (err: HttpErrorResponse) => {
          this.message = err.error;
        },
      });
    } else {
      this.userService.addUser(this.userForm.getRawValue()).subscribe({
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
