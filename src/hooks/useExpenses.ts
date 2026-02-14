'use client';

import { useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { Expense, ExpenseFormData, Filters, ExpenseSummary, Category } from '@/lib/types';
import { useLocalStorage } from './useLocalStorage';
import { dollarsToCents } from '@/lib/utils';
import { STORAGE_KEY } from '@/lib/constants';

export function useExpenses() {
  const [expenses, setExpenses, isLoaded] = useLocalStorage<Expense[]>(STORAGE_KEY, []);

  const addExpense = useCallback(
    (formData: ExpenseFormData) => {
      const newExpense: Expense = {
        id: uuidv4(),
        description: formData.description.trim(),
        amount: dollarsToCents(formData.amount),
        category: formData.category,
        date: formData.date,
        createdAt: new Date().toISOString(),
      };
      setExpenses((prev) => [newExpense, ...prev]);
      return newExpense;
    },
    [setExpenses]
  );

  const updateExpense = useCallback(
    (id: string, formData: ExpenseFormData) => {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                description: formData.description.trim(),
                amount: dollarsToCents(formData.amount),
                category: formData.category,
                date: formData.date,
              }
            : e
        )
      );
    },
    [setExpenses]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    },
    [setExpenses]
  );

  const getExpense = useCallback(
    (id: string): Expense | undefined => {
      return expenses.find((e) => e.id === id);
    },
    [expenses]
  );

  const filterExpenses = useCallback(
    (filters: Filters): Expense[] => {
      let filtered = [...expenses];

      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter((e) => e.description.toLowerCase().includes(query));
      }

      if (filters.category !== 'all') {
        filtered = filtered.filter((e) => e.category === filters.category);
      }

      if (filters.dateFrom) {
        filtered = filtered.filter((e) => e.date >= filters.dateFrom);
      }

      if (filters.dateTo) {
        filtered = filtered.filter((e) => e.date <= filters.dateTo);
      }

      filtered.sort((a, b) => {
        let cmp = 0;
        switch (filters.sortBy) {
          case 'date':
            cmp = a.date.localeCompare(b.date);
            break;
          case 'amount':
            cmp = a.amount - b.amount;
            break;
          case 'description':
            cmp = a.description.localeCompare(b.description);
            break;
          case 'category':
            cmp = a.category.localeCompare(b.category);
            break;
        }
        return filters.sortOrder === 'desc' ? -cmp : cmp;
      });

      return filtered;
    },
    [expenses]
  );

  const summary: ExpenseSummary = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthlyExpenses = expenses
      .filter((e) => {
        const d = parseISO(e.date);
        return d >= monthStart && d <= monthEnd;
      })
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    const categoryTotals = new Map<Category, number>();
    expenses.forEach((e) => {
      categoryTotals.set(e.category, (categoryTotals.get(e.category) || 0) + e.amount);
    });

    let topCategory: ExpenseSummary['topCategory'] = null;
    let maxAmount = 0;
    categoryTotals.forEach((amount, category) => {
      if (amount > maxAmount) {
        maxAmount = amount;
        topCategory = { category, amount };
      }
    });

    return {
      totalExpenses,
      monthlyExpenses,
      averageExpense: expenses.length > 0 ? Math.round(totalExpenses / expenses.length) : 0,
      topCategory,
      expenseCount: expenses.length,
    };
  }, [expenses]);

  return {
    expenses,
    isLoaded,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpense,
    filterExpenses,
    summary,
  };
}
