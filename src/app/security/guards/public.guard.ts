import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookiesService } from '../../services/cookies/cookies.service';
import { EnumCookie } from '../../services/cookies/cookie.enum';



export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookiesService = inject(CookiesService);

  const token = cookiesService.get(EnumCookie.AUTHORIZATION);

  /* if(token) {
    router.navigate(['/home'])
  } */
    //router.navigate(['/check-price']);
  return true;
};