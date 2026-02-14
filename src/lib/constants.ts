import { Category } from './types';

export const STORAGE_KEY = 'expense-tracker-data';

export const CATEGORIES: { value: Category; label: string; color: string; icon: string }[] = [
  { value: 'food', label: 'Food & Dining', color: '#ef4444', icon: 'UtensilsCrossed' },
  { value: 'transport', label: 'Transport', color: '#3b82f6', icon: 'Car' },
  { value: 'entertainment', label: 'Entertainment', color: '#8b5cf6', icon: 'Gamepad2' },
  { value: 'shopping', label: 'Shopping', color: '#f59e0b', icon: 'ShoppingBag' },
  { value: 'bills', label: 'Bills & Utilities', color: '#6366f1', icon: 'Receipt' },
  { value: 'health', label: 'Health', color: '#10b981', icon: 'Heart' },
  { value: 'education', label: 'Education', color: '#06b6d4', icon: 'GraduationCap' },
  { value: 'travel', label: 'Travel', color: '#ec4899', icon: 'Plane' },
  { value: 'other', label: 'Other', color: '#6b7280', icon: 'MoreHorizontal' },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c])
) as Record<Category, (typeof CATEGORIES)[number]>;

export const DEFAULT_FILTERS = {
  search: '',
  category: 'all' as const,
  dateFrom: '',
  dateTo: '',
  sortBy: 'date' as const,
  sortOrder: 'desc' as const,
};
