import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, LanguageSelectorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    // Subscribe to language changes to update error messages
    this.translationService.currentLanguage$.subscribe(() => {
      if (this.errorMessage) {
        // Re-translate the current error message
        this.updateErrorMessage();
      }
    });
  }

  private updateErrorMessage(): void {
    if (this.errorMessage === 'Por favor, preencha todos os campos' || 
        this.errorMessage === 'Please fill in all fields') {
      this.errorMessage = this.translationService.translate('login.error.required');
    } else if (this.errorMessage === 'Usuário ou senha incorretos' || 
               this.errorMessage === 'Invalid username or password') {
      this.errorMessage = this.translationService.translate('login.error.invalid');
    } else if (this.errorMessage === 'Erro ao fazer login. Tente novamente.' || 
               this.errorMessage === 'Login error. Please try again.') {
      this.errorMessage = this.translationService.translate('login.error.generic');
    }
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = this.translationService.translate('login.error.required');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = this.translationService.translate('login.error.invalid');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = this.translationService.translate('login.error.generic');
        console.error('Login error:', error);
      }
    });
  }

  fillDemoCredentials(): void {
    this.username = 'demo';
    this.password = 'demo';
  }
}
