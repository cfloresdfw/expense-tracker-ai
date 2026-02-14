'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense } from '@/lib/types';
import { getMonthlyData, formatCurrency } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface MonthlyTrendProps {
  expenses: Expense[];
}

export default function MonthlyTrend({ expenses }: MonthlyTrendProps) {
  const data = useMemo(() => {
    return getMonthlyData(expenses).map((d) => ({
      ...d,
      totalDollars: d.total / 100,
    }));
  }, [expenses]);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Spending Trend</h3>
      {expenses.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">Add expenses to see spending trends</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
              <Line
                type="monotone"
                dataKey="totalDollars"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
