import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';

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
      telephone: ['', [Validators.required, Validators.pattern(/^(\+221|221)?(77|76|78|75|70)[0-9]{7}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { telephone, password } = this.loginForm.value;

      this.dataService.authenticateUser(telephone, password).subscribe(user => {
        if (user) {
          console.log('Login successful:', user);

          // If user is an agricultor, require admin validation before granting access
          const requiresValidation = user.userType === 'agriculteur';
          const isApproved = user.validationStatus === 'approved' || user.isValidated === true;

          if (requiresValidation && !isApproved) {
            // Notify the user that their account is pending approval or rejected
            if (user.validationStatus === 'rejected') {
              Swal.fire({
                icon: 'error',
                title: 'Inscription rejetée',
                text: 'Votre inscription a été rejetée. Contactez le support pour plus d\'informations.',
                confirmButtonColor: '#22c55e'
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'Validation en attente',
                text: 'Votre compte est en attente de validation par l\'administration. Vous recevrez une notification une fois traité.',
                confirmButtonColor: '#22c55e'
              });
            }
            this.isLoading = false;
            return;
          }

          // Store user info in localStorage for session management
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Navigate based on user type (use specific dashboards where available)
          const userTypeRoutes: { [key: string]: string } = {
            'agriculteur': '/dashboard-agriculteur',
            'client': '/dashboard-institutionnel',
            'admin': '/dashboard-admin',
            'investisseur': '/dashboard-institutionnel',
            'agronome': '/dashboard-institutionnel',
            'agent-terrain': '/dashboard-institutionnel',
            'etat': '/dashboard-institutionnel'
          };

          const route = userTypeRoutes[user.userType] || '/dashboard-institutionnel';
          this.router.navigate([route]);
        } else {
          console.log('Login failed: Invalid credentials');
          Swal.fire({
            icon: 'error',
            title: 'Connexion échouée',
            text: 'Numéro de téléphone ou mot de passe incorrect',
            confirmButtonColor: '#22c55e'
          });
        }
        this.isLoading = false;
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  get telephone() {
    return this.loginForm.get('telephone');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }
}