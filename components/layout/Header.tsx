'use client';

import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { Logo } from './Logo';
import { invites } from '@/lib/data';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  actions?: React.ReactNode;
}

export function Header({ title, showSearch = false, actions }: HeaderProps) {
  const notificationCount = invites.length;

  return (
    <header className="sticky top-0 bg-cream-100/95 backdrop-blur-sm z-30 border-b border-ink-100 lg:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          {title ? (
            <h1 className="text-lg font-bold text-ink-900">{title}</h1>
          ) : (
            <Logo size="sm" />
          )}
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <button className="p-2 text-ink-500 hover:text-ink-700 hover:bg-ink-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
          )}
          <Link
            href="/convites"
            className="relative p-2 text-ink-500 hover:text-ink-700 hover:bg-ink-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-tomato-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Link>
          {actions}
        </div>
      </div>
    </header>
  );
}
