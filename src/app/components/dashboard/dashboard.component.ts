import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe, LanguageSelectorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentMember: Member | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.currentMember = this.authService.getCurrentMember();
    if (!this.currentMember) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getRankingStars(): string {
    if (!this.currentMember) return '';
    return '★'.repeat(this.currentMember.ranking) + '☆'.repeat(5 - this.currentMember.ranking);
  }

  getPlanColor(): string {
    if (!this.currentMember) return '#666';
    switch (this.currentMember.plan) {
      case 'Gold': return '#FFD700';
      case 'Platinum': return '#E5E4E2';
      case 'Diamond': return '#B9F2FF';
      default: return '#666';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString(this.translationService.getCurrentLanguage());
  }
}
