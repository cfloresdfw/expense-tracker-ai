'use client';

import { DollarSign, Calendar, TrendingUp, Tag } from 'lucide-react';
import { ExpenseSummary } from '@/lib/types';
import { CATEGORY_MAP } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface SummaryCardsProps {
  summary: ExpenseSummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Expenses',
      value: formatCurrency(summary.totalExpenses),
      subtitle: `${summary.expenseCount} expense${summary.expenseCount !== 1 ? 's' : ''}`,
      icon: DollarSign,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'This Month',
      value: formatCurrency(summary.monthlyExpenses),
      subtitle: 'Current month spending',
      icon: Calendar,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Average',
      value: formatCurrency(summary.averageExpense),
      subtitle: 'Per expense',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Top Category',
      value: summary.topCategory ? CATEGORY_MAP[summary.topCategory.category].label : 'N/A',
      subtitle: summary.topCategory ? formatCurrency(summary.topCategory.amount) : 'No data',
      icon: Tag,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} padding="sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{card.value}</p>
                <p className="text-xs text-gray-400 mt-1">{card.subtitle}</p>
              </div>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <Icon size={20} className={card.color} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
