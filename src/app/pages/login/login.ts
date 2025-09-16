import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../service/auth';
import { ActivatedRoute, Router } from '@angular/router'; // ✅ use Angular Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;
  shareId: string | null = null;

  // ✅ Inject Angular Router here
  constructor(
    private fb: FormBuilder, 
    private auth: Auth, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.shareId = this.route.snapshot.queryParamMap.get('shareId');
  }
// ngOnInit(){
//   this.shareId = this.route.snapshot.queryParamMap.get('shareId');
  
//   this.router.navigate(['/login'], { replaceUrl: true });
// }
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.auth.login(username, password).subscribe({
        next: (response) => {
          localStorage.setItem('jwt', response);
          localStorage.setItem('username', username);



          if (this.shareId) {  
            this.router.navigate(['/project/share', this.shareId]); 
          } else {
            this.router.navigate(['/project']);
          }
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
