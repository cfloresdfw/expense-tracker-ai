'use client';

import { Filters, SortField, SortOrder, Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';

interface FilterControlsProps {
  filters: Filters;
  onChange: (filters: Partial<Filters>) => void;
}

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  ...CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
];

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'amount', label: 'Amount' },
  { value: 'description', label: 'Description' },
  { value: 'category', label: 'Category' },
];

const orderOptions = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

export default function FilterControls({ filters, onChange }: FilterControlsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <Select
        id="filter-category"
        options={categoryOptions}
        value={filters.category}
        onChange={(e) => onChange({ category: e.target.value as Category | 'all' })}
      />

      <Input
        id="filter-from"
        type="date"
        placeholder="From date"
        value={filters.dateFrom}
        onChange={(e) => onChange({ dateFrom: e.target.value })}
      />

      <Input
        id="filter-to"
        type="date"
        placeholder="To date"
        value={filters.dateTo}
        onChange={(e) => onChange({ dateTo: e.target.value })}
      />

      <div className="flex gap-2">
        <Select
          id="filter-sort"
          options={sortOptions}
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as SortField })}
          className="flex-1"
        />
        <Select
          id="filter-order"
          options={orderOptions}
          value={filters.sortOrder}
          onChange={(e) => onChange({ sortOrder: e.target.value as SortOrder })}
          className="w-32"
        />
      </div>
    </div>
  );
}
