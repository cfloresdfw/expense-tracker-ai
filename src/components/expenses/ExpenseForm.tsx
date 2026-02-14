'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ExpenseFormData, Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { validateExpenseForm, hasErrors, ValidationErrors } from '@/lib/validators';
import { getToday, centsToDollars } from '@/lib/utils';
import { useExpenseContext } from '@/context/ExpenseContext';
import { Expense } from '@/lib/types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

interface ExpenseFormProps {
  expense?: Expense;
}

export default function ExpenseForm({ expense }: ExpenseFormProps) {
  const router = useRouter();
  const { addExpense, updateExpense } = useExpenseContext();
  const isEditing = !!expense;

  const [formData, setFormData] = useState<ExpenseFormData>({
    description: expense?.description || '',
    amount: expense ? centsToDollars(expense.amount) : '',
    category: expense?.category || 'food',
    date: expense?.date || getToday(),
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  function handleChange(field: keyof ExpenseFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateExpenseForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing && expense) {
      updateExpense(expense.id, formData);
    } else {
      addExpense(formData);
    }
    router.push('/expenses');
  }

  const categoryOptions = CATEGORIES.map((c) => ({ value: c.value, label: c.label }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        id="description"
        label="Description"
        placeholder="e.g., Lunch at cafe"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        error={errors.description}
        maxLength={100}
      />

      <Input
        id="amount"
        label="Amount ($)"
        type="number"
        placeholder="0.00"
        step="0.01"
        min="0.01"
        value={formData.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        error={errors.amount}
      />

      <Select
        id="category"
        label="Category"
        options={categoryOptions}
        value={formData.category}
        onChange={(e) => handleChange('category', e.target.value as Category)}
        error={errors.category}
      />

      <Input
        id="date"
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) => handleChange('date', e.target.value)}
        error={errors.date}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit">{isEditing ? 'Update Expense' : 'Add Expense'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
