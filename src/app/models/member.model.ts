export interface Member {
  id: string;
  username: string;
  email: string;
  password: string;
  plan: 'Gold' | 'Platinum' | 'Diamond';
  ranking: number; // 1-5 estrelas
  bezCoins: number;
  isActive: boolean;
  createdAt: Date;
  lastPaymentDate: Date;
  nextPaymentDate: Date;
}

export interface PaymentHistory {
  id: string;
  memberId: string;
  amount: number;
  currency: string;
  paymentMethod: 'Credit Card' | 'Pix' | 'Bank Transfer' | 'PayPal';
  status: 'Completed' | 'Pending' | 'Failed';
  date: Date;
  description: string;
}

export interface PlanDetails {
  name: 'Gold' | 'Platinum' | 'Diamond';
  price: number;
  bezCoins: number;
  features: string[];
}
