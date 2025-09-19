import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CommonService } from './common-service';

import { HeaderService } from './header-service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private tokenKey = 'jwt';
  private baseUrl = environment.apiUrl;
  private _isLogin=signal<boolean>(false);
   readonly isLogin = this._isLogin.asReadonly();
  constructor(private router: Router, private http: HttpClient,private commonService:CommonService,private headerService:HeaderService) {

  }
  updateLoginStatus(status: boolean) {
    this._isLogin.set(status);
  }
  
 login(username: string, password: string): Observable<any> {
    if (username && password) {
      this._isLogin.set(true);
      console.log("Login called with:", username, password, this.isLogin());
      
      return this.http.post(`${this.baseUrl}/auth/login`, { username, password },{responseType: 'text'});
    }
    throw new Error("Invalid email or password");
  }
  

register(username: string,email: string, password: string): Observable<any> {
    if (email && password) {
      return this.http.post(`${this.baseUrl}/auth/register`, { username, email, password },{responseType: 'text'});
    }
   throw new Error("Invalid email or password");
  }
 
 async logout(): Promise<void> {
   const token=await this.commonService.getToken();
   console.log("Token in logout:", token);

      await fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ token })
    }).then(val=>{
      console.log("Logout response:", val);
      if (val.ok) {
        // console.log(val.text());
        this._isLogin.set(false);
        localStorage.removeItem(this.tokenKey);
        this.headerService.updateLoginStatus(false);
        this.router.navigateByUrl('/', { replaceUrl: true });
      
      } 
    }).catch(error => {
      console.error('Logout error:', error);
      return null;
    });

   
    
      
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}

