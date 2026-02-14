'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Expense } from '@/lib/types';
import { CATEGORY_MAP } from '@/lib/constants';
import { formatCurrency, formatShortDate } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface RecentExpensesProps {
  expenses: Expense[];
}

export default function RecentExpenses({ expenses }: RecentExpensesProps) {
  const recent = expenses
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Recent Expenses</h3>
        {expenses.length > 0 && (
          <Link
            href="/expenses"
            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </Link>
        )}
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No expenses yet</p>
      ) : (
        <div className="space-y-3">
          {recent.map((expense) => {
            const cat = CATEGORY_MAP[expense.category];
            return (
              <div key={expense.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: cat.color + '20' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{expense.description}</p>
                  <p className="text-xs text-gray-400">{formatShortDate(expense.date)}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 shrink-0">
                  {formatCurrency(expense.amount)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
