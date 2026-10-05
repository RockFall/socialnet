'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, Compass, Bell, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { Avatar } from '@/components/ui/Avatar';
import { currentUser, invites } from '@/lib/data';

const mainNavItems = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/grupos', icon: Users, label: 'Grupos' },
  { href: '/encontros', icon: Calendar, label: 'Encontros' },
  { href: '/descobrir', icon: Compass, label: 'Descobrir' },
];

const secondaryNavItems = [
  { href: '/convites', icon: Bell, label: 'Convites', badge: invites.length },
  { href: '/perfil', icon: User, label: 'Perfil' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-ink-100 flex flex-col z-40 hidden lg:flex">
      <div className="p-6">
        <Logo size="md" />
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors',
                  isActive
                    ? 'bg-tomato-50 text-tomato-600'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'text-tomato-500')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="h-px bg-ink-100 my-4" />

        <div className="space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors',
                  isActive
                    ? 'bg-tomato-50 text-tomato-600'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'text-tomato-500')} />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-tomato-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-ink-100">
        <Link
          href="/perfil"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-50 transition-colors"
        >
          <Avatar src={currentUser.photo} name={currentUser.name} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink-900 truncate">{currentUser.name}</p>
            <p className="text-xs text-ink-500 truncate">{currentUser.location}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
