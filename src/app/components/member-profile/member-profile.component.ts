import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Member, PaymentHistory } from '../../models/member.model';

@Component({
  selector: 'app-member-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.scss'
})
export class MemberProfileComponent implements OnInit {
  currentMember: Member | null = null;
  paymentHistory: PaymentHistory[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentMember = this.authService.getCurrentMember();
    if (!this.currentMember) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadPaymentHistory();
  }

  loadPaymentHistory(): void {
    // Dados mockados para demonstração
    this.paymentHistory = [
      {
        id: '1',
        memberId: this.currentMember!.id,
        amount: 250,
        currency: 'USD',
        paymentMethod: 'Credit Card',
        status: 'Completed',
        date: new Date('2024-01-01'),
        description: 'Mensalidade Gold - Janeiro 2024'
      },
      {
        id: '2',
        memberId: this.currentMember!.id,
        amount: 500,
        currency: 'USD',
        paymentMethod: 'Pix',
        status: 'Completed',
        date: new Date('2023-12-01'),
        description: 'Mensalidade Gold - Dezembro 2023'
      },
      {
        id: '3',
        memberId: this.currentMember!.id,
        amount: 100,
        currency: 'USD',
        paymentMethod: 'Bank Transfer',
        status: 'Pending',
        date: new Date('2024-01-15'),
        description: 'Recarga de B.E.Z. Coins'
      }
    ];
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
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

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed': return '#28a745';
      case 'Pending': return '#ffc107';
      case 'Failed': return '#dc3545';
      default: return '#6c757d';
    }
  }

  payMonthlyFee(): void {
    // Implementar lógica de pagamento
    alert('Funcionalidade de pagamento será implementada em breve!');
  }
}
