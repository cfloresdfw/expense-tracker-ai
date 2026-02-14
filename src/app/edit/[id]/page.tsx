'use client';

import { useParams, useRouter } from 'next/navigation';
import { useExpenseContext } from '@/context/ExpenseContext';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EditExpensePage() {
  const params = useParams();
  const router = useRouter();
  const { getExpense, isLoaded } = useExpenseContext();

  if (!isLoaded) return <LoadingSpinner />;

  const expense = getExpense(params.id as string);

  if (!expense) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Expense Not Found</h1>
        <p className="text-gray-500 mb-4">The expense you&apos;re looking for doesn&apos;t exist.</p>
        <button
          onClick={() => router.push('/expenses')}
          className="text-blue-600 hover:underline"
        >
          Back to expenses
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Expense</h1>
      <Card>
        <ExpenseForm expense={expense} />
      </Card>
    </div>
  );
}
