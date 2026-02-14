'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense } from '@/lib/types';
import { getMonthlyData, formatCurrency } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface SpendingChartProps {
  expenses: Expense[];
}

export default function SpendingChart({ expenses }: SpendingChartProps) {
  const data = useMemo(() => {
    return getMonthlyData(expenses).map((d) => ({
      ...d,
      totalDollars: d.total / 100,
    }));
  }, [expenses]);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Spending</h3>
      {expenses.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">Add expenses to see your spending chart</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                formatter={(value) => [formatCurrency((value as number) * 100), 'Spending']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="totalDollars" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
