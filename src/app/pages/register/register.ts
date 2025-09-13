import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  [x: string]: any;
 registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
auth=inject(Auth);
  onSubmit() {
    console.log('Register Data:', this.registerForm.value);
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      const credentials = this.registerForm.value;
   this.auth.register(credentials.username,credentials.email,credentials.password).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        alert("Registration successful! Please login.");
        window.location.href = '/login';
      },
      error: (error: { error: any; message: any; }) => {
        console.error('Registration error:', error);
        alert("Registration failed: " + (error.error || error.message || "Unknown error"));
      }
    });
    
    }
    else{
      alert("Please ensure all fields are filled correctly and passwords match.");
    }
  }
}
