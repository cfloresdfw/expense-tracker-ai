'use client';

import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { Expense } from '@/lib/types';
import { CATEGORY_MAP } from '@/lib/constants';
import { formatCurrency, formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface ExpenseRowProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseRow({ expense, onDelete }: ExpenseRowProps) {
  const cat = CATEGORY_MAP[expense.category];

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: cat.color + '20' }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{expense.description}</p>
        <p className="text-xs text-gray-500">
          {cat.label} &middot; {formatDate(expense.date)}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Link href={`/edit/${expense.id}`}>
          <Button variant="ghost" size="sm" aria-label="Edit expense">
            <Pencil size={16} />
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={() => onDelete(expense.id)} aria-label="Delete expense">
          <Trash2 size={16} className="text-red-500" />
        </Button>
      </div>
    </div>
  );
}
