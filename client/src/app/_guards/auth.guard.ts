import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map(user => {
      if (user)
        return true;
      else {
        toastr.error('you shall not pass!');
        router.navigateByUrl('/');
        return false;
      }
    })
  )
};
