import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async getToken() {
    let token: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt');
    }

    if (!token) {
      throw new Error("No JWT token found. Login again.");
      //TODO:: navigate ot login
    }
    return token;
  }
}
