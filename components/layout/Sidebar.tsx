'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users, Calendar, Compass, Bell, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { Avatar } from '@/components/ui/Avatar';

interface UserData {
  id: string;
  name: string;
  photo: string | null;
  location: string | null;
}

const mainNavItems = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/grupos', icon: Users, label: 'Grupos' },
  { href: '/encontros', icon: Calendar, label: 'Encontros' },
  { href: '/descobrir', icon: Compass, label: 'Descobrir' },
];

const secondaryNavItems = [
  { href: '/convites', icon: Bell, label: 'Convites' },
  { href: '/perfil', icon: User, label: 'Perfil' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

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
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-ink-100">
        {user ? (
          <div className="space-y-2">
            <Link
              href="/perfil"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-50 transition-colors"
            >
              <Avatar src={user.photo || ''} name={user.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-900 truncate">{user.name}</p>
                <p className="text-xs text-ink-500 truncate">{user.location || 'Definir localização'}</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-ink-500 hover:bg-ink-50 hover:text-ink-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sair</span>
            </button>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-full bg-ink-100" />
              <div className="flex-1">
                <div className="h-4 bg-ink-100 rounded w-24 mb-1" />
                <div className="h-3 bg-ink-100 rounded w-16" />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
