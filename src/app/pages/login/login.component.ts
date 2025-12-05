import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.dataService.authenticateUser(email, password).subscribe(user => {
        if (user) {
          console.log('Login successful:', user);

          // Navigate based on user type
          const userTypeRoutes: { [key: string]: string } = {
            'agriculteur': '/dashboard-agriculteur',
            'client': '/dashboard-client',
            'admin': '/dashboard-admin',
            'investisseur': '/dashboard-investisseur',
            'agronome': '/dashboard-agronome',
            'agent-terrain': '/dashboard-agent-terrain',
            'etat': '/dashboard-etat'
          };

          const route = userTypeRoutes[user.userType] || '/';
          this.router.navigate([route]);
        } else {
          console.log('Login failed: Invalid credentials');
          alert('Email ou mot de passe incorrect');
        }
        this.isLoading = false;
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}