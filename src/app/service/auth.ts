import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { register } from 'module';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private tokenKey = 'auth_token';
  private baseUrl = 'http://localhost:8080/auth';
  constructor(private router: Router, private http: HttpClient) {}
  
 login(username: string, password: string): Observable<any> {
    if (username && password) {
      return this.http.post(`${this.baseUrl}/login`, { username, password },{responseType: 'text'});
    }
    throw new Error("Invalid email or password");
  }
  

register(username: string,email: string, password: string): Observable<any> {
    if (email && password) {
      return this.http.post(`${this.baseUrl}/register`, { username, email, password },{responseType: 'text'});
    }
   throw new Error("Invalid email or password");
  }
 
  logout(token: string): void {
    this.http.post(`${this.baseUrl}/logout`, { token }, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Logout error:', error);
          return [];
        })
      )
      .subscribe(response => {
        if (response === "Success") {
          localStorage.removeItem(this.tokenKey);
          this.router.navigate(['/login']);
        }
      });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}

