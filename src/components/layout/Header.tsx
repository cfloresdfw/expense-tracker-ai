'use client';

import Link from 'next/link';
import { Wallet } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Wallet className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ExpenseTracker</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/expenses">Expenses</NavLink>
            <NavLink href="/add">Add Expense</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}
