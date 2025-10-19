export interface BezCoinTransaction {
  id: string;
  memberId: string;
  type: 'Earned' | 'Spent' | 'Purchased' | 'Refund';
  amount: number;
  description: string;
  date: Date;
  source: 'Monthly Plan' | 'Lead Purchase' | 'Manual Purchase' | 'Refund';
}

export interface CoinPurchase {
  id: string;
  memberId: string;
  amount: number;
  bezCoins: number;
  price: number;
  currency: string;
  paymentMethod: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: Date;
}
