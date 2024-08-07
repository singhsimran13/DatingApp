import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { map, take } from 'rxjs';

export const registerGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    map(user => {

      if (user) {
        accountService.logout();
        router.navigateByUrl('/register');
      }

      return true;
    })
  )

};
