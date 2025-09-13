import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../service/auth';
import { UrlSegment } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    // console.log(this.loginForm);
  }

  onSubmit() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
console.log(username);

      this.auth.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
  //         (typeof window !== 'undefined' && localStorage)
  // ? localStorage.setItem('jwt',response)
  // : null;

          localStorage.setItem('jwt', response);
          localStorage.setItem('username', username);

          window.location.href = '/project';
        },
        error: (error) => {
          console.error('Login error:', error);
          alert("Login failed: " + (error.error || error.message || "Unknown error"));
        }
      });
    } else {
      alert("Please enter a valid username and password.");
    }
  }
}
