import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck {
  public constructor(
    private router: Router,
    private userService: UsersService
  ) {}

  protected name: string = '';

  public ngDoCheck(): void {
    this.userService.checkIfLogged();
    this.name = this.userService.getWhoIsLogged();
  }

  public goHome(): void {
    this.router.navigate(['home']);
  }

  public logout(): void {
    this.userService.logOut();
    this.router.navigate(['login']);
  }

  public goToDetails(): void {
    this.router.navigate(['user', 'details', this.userService.getId()]);
  }
}
