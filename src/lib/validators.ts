import { ExpenseFormData } from './types';

export interface ValidationErrors {
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
}

export function validateExpenseForm(data: ExpenseFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length > 100) {
    errors.description = 'Description must be 100 characters or less';
  }

  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else {
    const parsed = parseFloat(data.amount);
    if (isNaN(parsed) || parsed <= 0) {
      errors.amount = 'Amount must be a positive number';
    } else if (parsed > 999999.99) {
      errors.amount = 'Amount is too large';
    }
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.date) {
    errors.date = 'Date is required';
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
