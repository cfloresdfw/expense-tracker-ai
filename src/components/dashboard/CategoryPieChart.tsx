'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Expense } from '@/lib/types';
import { getCategoryData, formatCurrency } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface CategoryPieChartProps {
  expenses: Expense[];
}

export default function CategoryPieChart({ expenses }: CategoryPieChartProps) {
  const data = useMemo(() => getCategoryData(expenses), [expenses]);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Spending by Category</h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">Add expenses to see category breakdown</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
              >
                {data.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend
                formatter={(value: string) => (
                  <span className="text-xs text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
