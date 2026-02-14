'use client';

import { useState, useMemo } from 'react';
import { Receipt, Plus } from 'lucide-react';
import Link from 'next/link';
import { useExpenseContext } from '@/context/ExpenseContext';
import { useDebounce } from '@/hooks/useDebounce';
import { Filters } from '@/lib/types';
import { DEFAULT_FILTERS } from '@/lib/constants';
import SearchBar from './SearchBar';
import FilterControls from './FilterControls';
import ExpenseRow from './ExpenseRow';
import DeleteConfirmModal from './DeleteConfirmModal';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ExpenseList() {
  const { expenses, isLoaded, filterExpenses, deleteExpense } = useExpenseContext();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const debouncedSearch = useDebounce(filters.search);

  const filteredExpenses = useMemo(
    () => filterExpenses({ ...filters, search: debouncedSearch }),
    [filterExpenses, filters, debouncedSearch]
  );

  function handleFilterChange(updates: Partial<Filters>) {
    setFilters((prev) => ({ ...prev, ...updates }));
  }

  function handleDelete(id: string) {
    setDeleteTarget(id);
  }

  function confirmDelete() {
    if (deleteTarget) {
      deleteExpense(deleteTarget);
      setDeleteTarget(null);
    }
  }

  const expenseToDelete = deleteTarget ? expenses.find((e) => e.id === deleteTarget) : null;

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <SearchBar
        value={filters.search}
        onChange={(search) => handleFilterChange({ search })}
      />

      <FilterControls filters={filters} onChange={handleFilterChange} />

      {filteredExpenses.length === 0 ? (
        <EmptyState
          icon={<Receipt size={48} />}
          title={expenses.length === 0 ? 'No expenses yet' : 'No matching expenses'}
          description={
            expenses.length === 0
              ? 'Add your first expense to start tracking your spending.'
              : 'Try adjusting your search or filter criteria.'
          }
          action={
            expenses.length === 0 ? (
              <Link href="/add">
                <Button>
                  <Plus size={16} />
                  Add Expense
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        expenseDescription={expenseToDelete?.description || ''}
      />
    </div>
  );
}
