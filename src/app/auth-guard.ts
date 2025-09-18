import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { CommonService } from './service/common-service';
import { Auth } from './service/auth';

export const authGuard: CanActivateFn = async (route, state): Promise<boolean | UrlTree> => {
  const commonService = inject(CommonService);
  const router = inject(Router);
  const auth = inject(Auth);

  try {
    const token = await commonService.getToken(); 
    console.log("AuthGuard - Token:", token);

    // The token is now the actual string or null, not a promise.
    const isAuth = !!token && token.trim() !== '';

    if (isAuth) {
      auth.updateLoginStatus(true);
      return true; 
    } else {
      auth.updateLoginStatus(false);
      console.log("AuthGuard - Redirecting to /");
      return router.parseUrl('/'); 
    }
  } catch (error) {
    console.error("AuthGuard - Error during token check:", error);
    auth.updateLoginStatus(false);
    return router.parseUrl('/'); 
  }
};