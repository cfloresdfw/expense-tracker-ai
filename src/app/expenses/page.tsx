'use client';

import Link from 'next/link';
import { Plus, Download } from 'lucide-react';
import { useExpenseContext } from '@/context/ExpenseContext';
import { exportToCSV } from '@/lib/utils';
import ExpenseList from '@/components/expenses/ExpenseList';
import Button from '@/components/ui/Button';

export default function ExpensesPage() {
  const { expenses } = useExpenseContext();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <div className="flex items-center gap-2">
          {expenses.length > 0 && (
            <Button variant="secondary" size="sm" onClick={() => exportToCSV(expenses)}>
              <Download size={16} />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          )}
          <Link href="/add">
            <Button size="sm">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Expense</span>
            </Button>
          </Link>
        </div>
      </div>
      <ExpenseList />
    </div>
  );
}
