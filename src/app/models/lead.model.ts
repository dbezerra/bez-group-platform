export interface Lead {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number; // em B.E.Z. Coins
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  createdAt: Date;
  isAvailable: boolean;
  priority: 'High' | 'Medium' | 'Low';
  segment: string;
}

export interface LeadPurchase {
  id: string;
  memberId: string;
  leadId: string;
  bezCoinsSpent: number;
  purchaseDate: Date;
  status: 'Completed' | 'Pending' | 'Cancelled';
}
