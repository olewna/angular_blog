import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { inject } from '@angular/core';

export const loggedGuard: CanActivateFn = () => {
  return (
    inject(UsersService).checkIfLogged() ||
    inject(Router).createUrlTree(['/login'])
  );
};
