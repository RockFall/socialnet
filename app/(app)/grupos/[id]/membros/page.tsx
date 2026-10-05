'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Crown, UserPlus, MoreHorizontal, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { groups, currentUser } from '@/lib/data';
import { formatRelativeTime } from '@/lib/utils';
import { useState } from 'react';

export default function MembrosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const group = groups.find(g => g.id === id);
  const [searchQuery, setSearchQuery] = useState('');

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Grupo não encontrado</p>
      </div>
    );
  }

  const filteredMembers = group.members.filter(m =>
    m.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const admins = filteredMembers.filter(m => m.role === 'admin');
  const members = filteredMembers.filter(m => m.role === 'member');

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-ink-100 z-30">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/grupos/${group.id}`}
              className="p-2 -ml-2 text-ink-500 hover:text-ink-700 hover:bg-ink-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-semibold text-ink-900">Membros</h1>
              <p className="text-xs text-ink-500">{group.name}</p>
            </div>
          </div>
          <Button size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
            Convidar
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Search */}
        <Input
          placeholder="Buscar membros..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-5 h-5" />}
          className="mb-6"
        />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card padding="md" className="text-center">
            <p className="text-2xl font-bold text-ink-900">{group.memberCount}</p>
            <p className="text-sm text-ink-500">membros</p>
          </Card>
          <Card padding="md" className="text-center">
            <p className="text-2xl font-bold text-ink-900">{admins.length}</p>
            <p className="text-sm text-ink-500">{admins.length === 1 ? 'admin' : 'admins'}</p>
          </Card>
        </div>

        {/* Admins */}
        {admins.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-medium text-ink-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              Administradores
            </h2>
            <div className="space-y-2">
              {admins.map(({ user, joinedAt }) => (
                <Link
                  key={user.id}
                  href={`/perfil/${user.id}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-ink-100 hover:border-ink-200 transition-all"
                >
                  <Avatar src={user.photo} name={user.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-ink-900 truncate">{user.name}</h3>
                      {user.id === currentUser.id && (
                        <Badge variant="outline" size="sm">Você</Badge>
                      )}
                    </div>
                    <p className="text-sm text-ink-500 truncate">{user.bio}</p>
                  </div>
                  <button className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-lg">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Members */}
        {members.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-ink-500 uppercase tracking-wider mb-3">
              Membros ({members.length})
            </h2>
            <div className="space-y-2">
              {members.map(({ user, joinedAt }) => (
                <Link
                  key={user.id}
                  href={`/perfil/${user.id}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-ink-100 hover:border-ink-200 transition-all"
                >
                  <Avatar src={user.photo} name={user.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-ink-900 truncate">{user.name}</h3>
                      {user.id === currentUser.id && (
                        <Badge variant="outline" size="sm">Você</Badge>
                      )}
                    </div>
                    <p className="text-sm text-ink-500 truncate">{user.bio}</p>
                  </div>
                  <button className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-lg">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </Link>
              ))}
            </div>
          </section>
        )}

        {filteredMembers.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-ink-500">Nenhum membro encontrado</p>
          </Card>
        )}
      </div>
    </div>
  );
}
