'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useExpenseContext } from '@/context/ExpenseContext';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SpendingChart from '@/components/dashboard/SpendingChart';
import CategoryPieChart from '@/components/dashboard/CategoryPieChart';
import MonthlyTrend from '@/components/dashboard/MonthlyTrend';
import RecentExpenses from '@/components/dashboard/RecentExpenses';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DashboardPage() {
  const { expenses, isLoaded, summary } = useExpenseContext();

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Track your spending at a glance</p>
        </div>
        <Link href="/add">
          <Button>
            <Plus size={16} />
            Add Expense
          </Button>
        </Link>
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart expenses={expenses} />
        <CategoryPieChart expenses={expenses} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrend expenses={expenses} />
        <RecentExpenses expenses={expenses} />
      </div>
    </div>
  );
}
