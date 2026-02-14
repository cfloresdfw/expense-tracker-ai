'use client';

import ExpenseForm from '@/components/expenses/ExpenseForm';
import Card from '@/components/ui/Card';

export default function AddExpensePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Expense</h1>
      <Card>
        <ExpenseForm />
      </Card>
    </div>
  );
}
