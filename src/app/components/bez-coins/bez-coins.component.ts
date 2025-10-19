import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { Member, PlanDetails } from '../../models/member.model';
import { BezCoinTransaction, CoinPurchase } from '../../models/bez-coins.model';

@Component({
  selector: 'app-bez-coins',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, LanguageSelectorComponent],
  templateUrl: './bez-coins.component.html',
  styleUrl: './bez-coins.component.scss'
})
export class BezCoinsComponent implements OnInit {
  currentMember: Member | null = null;
  transactions: BezCoinTransaction[] = [];
  coinPurchases: CoinPurchase[] = [];
  selectedPurchaseAmount: number = 2500; // Valor mínimo Gold
  selectedPaymentMethod: string = 'Credit Card';
  Math = Math; // Expor Math para o template

  planDetails: PlanDetails[] = [
    {
      name: 'Gold',
      price: 250,
      bezCoins: 2500,
      features: ['2.500 B.E.Z. Coins', 'Acesso básico aos leads', 'Suporte por email']
    },
    {
      name: 'Platinum',
      price: 500,
      bezCoins: 5500,
      features: ['5.500 B.E.Z. Coins', 'Acesso antecipado aos leads', 'Suporte prioritário', 'Leads premium']
    },
    {
      name: 'Diamond',
      price: 1000,
      bezCoins: 12000,
      features: ['12.000 B.E.Z. Coins', 'Acesso VIP aos leads', 'Suporte 24/7', 'Leads exclusivos', 'Consultoria personalizada']
    }
  ];

  purchaseOptions = [
    { amount: 2500, price: 250, label: 'Gold Package' },
    { amount: 5500, price: 500, label: 'Platinum Package' },
    { amount: 12000, price: 1000, label: 'Diamond Package' },
    { amount: 5000, price: 500, label: 'Custom Package' },
    { amount: 10000, price: 1000, label: 'Premium Package' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.currentMember = this.authService.getCurrentMember();
    if (!this.currentMember) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTransactions();
    this.loadCoinPurchases();
  }

  loadTransactions(): void {
    // Dados mockados para demonstração
    this.transactions = [
      {
        id: '1',
        memberId: this.currentMember!.id,
        type: 'Earned',
        amount: 2500,
        description: 'Mensalidade Gold - Janeiro 2024',
        date: new Date('2024-01-01'),
        source: 'Monthly Plan'
      },
      {
        id: '2',
        memberId: this.currentMember!.id,
        type: 'Spent',
        amount: -150,
        description: 'Compra de Lead #12345',
        date: new Date('2024-01-10'),
        source: 'Lead Purchase'
      },
      {
        id: '3',
        memberId: this.currentMember!.id,
        type: 'Spent',
        amount: -200,
        description: 'Compra de Lead #12346',
        date: new Date('2024-01-15'),
        source: 'Lead Purchase'
      },
      {
        id: '4',
        memberId: this.currentMember!.id,
        type: 'Purchased',
        amount: 1000,
        description: 'Recarga manual de B.E.Z. Coins',
        date: new Date('2024-01-20'),
        source: 'Manual Purchase'
      }
    ];
  }

  loadCoinPurchases(): void {
    // Dados mockados para demonstração
    this.coinPurchases = [
      {
        id: '1',
        memberId: this.currentMember!.id,
        amount: 250,
        bezCoins: 2500,
        price: 250,
        currency: 'USD',
        paymentMethod: 'Credit Card',
        status: 'Completed',
        date: new Date('2024-01-01')
      },
      {
        id: '2',
        memberId: this.currentMember!.id,
        amount: 100,
        bezCoins: 1000,
        price: 100,
        currency: 'USD',
        paymentMethod: 'Pix',
        status: 'Completed',
        date: new Date('2024-01-20')
      }
    ];
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  getTransactionIcon(type: string): string {
    switch (type) {
      case 'Earned': return '💰';
      case 'Spent': return '💸';
      case 'Purchased': return '💳';
      case 'Refund': return '↩️';
      default: return '💰';
    }
  }

  getTransactionColor(type: string): string {
    switch (type) {
      case 'Earned': return '#28a745';
      case 'Spent': return '#dc3545';
      case 'Purchased': return '#007bff';
      case 'Refund': return '#ffc107';
      default: return '#6c757d';
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

  selectPurchaseOption(option: any): void {
    this.selectedPurchaseAmount = option.amount;
  }

  purchaseCoins(): void {
    if (!this.currentMember) return;

    const selectedOption = this.purchaseOptions.find(opt => opt.amount === this.selectedPurchaseAmount);
    if (!selectedOption) return;

    // Simular processo de compra
    const newPurchase: CoinPurchase = {
      id: Date.now().toString(),
      memberId: this.currentMember.id,
      amount: selectedOption.price,
      bezCoins: selectedOption.amount,
      price: selectedOption.price,
      currency: 'USD',
      paymentMethod: this.selectedPaymentMethod,
      status: 'Pending',
      date: new Date()
    };

    this.coinPurchases.unshift(newPurchase);

    // Simular transação
    const newTransaction: BezCoinTransaction = {
      id: Date.now().toString(),
      memberId: this.currentMember.id,
      type: 'Purchased',
      amount: selectedOption.amount,
      description: `Compra de ${selectedOption.amount} B.E.Z. Coins`,
      date: new Date(),
      source: 'Manual Purchase'
    };

    this.transactions.unshift(newTransaction);

    alert(`Compra de ${selectedOption.amount} B.E.Z. Coins iniciada! Status: Pendente`);
  }

  getCurrentPlan(): PlanDetails | undefined {
    if (!this.currentMember) return undefined;
    return this.planDetails.find(plan => plan.name === this.currentMember!.plan);
  }

  calculateTotalSpent(): number {
    return this.transactions
      .filter(t => t.type === 'Spent')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }

  calculateTotalEarned(): number {
    return this.transactions
      .filter(t => t.type === 'Earned' || t.type === 'Purchased')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getSelectedOptionPrice(): number {
    const option = this.purchaseOptions.find(opt => opt.amount === this.selectedPurchaseAmount);
    return option ? option.price : 0;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString(this.translationService.getCurrentLanguage());
  }
}