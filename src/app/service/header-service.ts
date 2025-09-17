import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

    isLogin = signal(false);

  updateLoginStatus(status: boolean) {
    this.isLogin.set(status);
  }
}
