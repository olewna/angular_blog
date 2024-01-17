import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

export const notLoggedGuard: CanActivateFn = () => {
  return (
    !inject(UsersService).checkIfLogged() ||
    inject(Router).createUrlTree(['/home'])
  );
};
