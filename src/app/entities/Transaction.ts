export interface Transaction {
  id: string;
  name: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  bankAccountId: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}
