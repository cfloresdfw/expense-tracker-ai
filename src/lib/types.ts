export interface Expense {
  id: string;
  description: string;
  amount: number; // in cents
  category: Category;
  date: string; // ISO date string YYYY-MM-DD
  createdAt: string; // ISO datetime
}

export type Category =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'bills'
  | 'health'
  | 'education'
  | 'travel'
  | 'other';

export interface ExpenseFormData {
  description: string;
  amount: string; // string for form input, converted to cents on save
  category: Category;
  date: string;
}

export interface Filters {
  search: string;
  category: Category | 'all';
  dateFrom: string;
  dateTo: string;
  sortBy: SortField;
  sortOrder: SortOrder;
}

export type SortField = 'date' | 'amount' | 'description' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface ExpenseSummary {
  totalExpenses: number; // cents
  monthlyExpenses: number; // cents
  averageExpense: number; // cents
  topCategory: { category: Category; amount: number } | null;
  expenseCount: number;
}

export interface MonthlyData {
  month: string;
  total: number; // cents
  label: string;
}

export interface CategoryData {
  category: Category;
  amount: number; // cents
  percentage: number;
  color: string;
  label: string;
}
