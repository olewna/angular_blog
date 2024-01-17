import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/User.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss'],
})
export class UserOptionsComponent implements OnInit {
  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private location: Location
  ) {}
  protected user: User = {
    id: '',
    login: '',
    email: '',
    password: '',
  };
  protected toDelete: boolean = false;

  public ngOnInit(): void {
    this.userService.getUserById(this.userService.getId()).subscribe({
      next: (res: User) => {
        this.user = res;
      },
      error: (err: HttpErrorResponse) => console.error(err.error),
    });
  }

  public deleteAccount(): void {
    this.toDelete = true;
  }

  public cancel(): void {
    this.toDelete = false;
  }

  public confirm(): void {
    this.userService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.userService.logOut();
        this.router.navigate(['home']);
      },
      error: (err: HttpErrorResponse) => console.error(err.error),
    });
  }

  public goToEdit(): void {
    this.router.navigate(['user', 'edit', this.userService.getId()]);
  }

  public goBack(): void {
    this.router.navigate(['home']);
  }
}
