'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, MessageSquare, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { users, groups, currentUser } from '@/lib/data';

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  if (id === 'me' || id === currentUser.id) {
    return null;
  }
  
  const user = users.find(u => u.id === id);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Usuário não encontrado</p>
      </div>
    );
  }

  const sharedGroups = groups.filter(g => 
    g.members.some(m => m.user.id === user.id) &&
    g.members.some(m => m.user.id === currentUser.id)
  );

  const sharedInterests = user.interests.filter(i => 
    currentUser.interests.includes(i)
  );

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-ink-100 z-30">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link
            href="/grupos"
            className="p-2 -ml-2 text-ink-500 hover:text-ink-700 hover:bg-ink-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card padding="lg" className="mb-6">
          <div className="flex flex-col items-center text-center">
            <Avatar src={user.photo} name={user.name} size="2xl" className="mb-4" />
            <h1 className="text-2xl font-bold text-ink-900 mb-1">{user.name}</h1>
            {user.location && (
              <p className="text-ink-500 flex items-center gap-1 mb-3">
                <MapPin className="w-4 h-4" />
                {user.location}
              </p>
            )}
            <p className="text-ink-600 mb-4 max-w-md">{user.bio}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {user.interests.map(interest => (
                <Badge 
                  key={interest} 
                  variant={sharedInterests.includes(interest) ? 'primary' : 'outline'}
                >
                  {interest}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 w-full max-w-xs">
              <Button variant="outline" fullWidth leftIcon={<MessageSquare className="w-4 h-4" />}>
                Mensagem
              </Button>
              <Button fullWidth leftIcon={<UserPlus className="w-4 h-4" />}>
                Convidar
              </Button>
            </div>
          </div>
        </Card>

        {/* Shared Info */}
        {(sharedGroups.length > 0 || sharedInterests.length > 0) && (
          <Card padding="lg">
            <h2 className="font-semibold text-ink-900 mb-4">Vocês têm em comum</h2>
            
            {sharedInterests.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-ink-500 mb-2">
                  {sharedInterests.length} {sharedInterests.length === 1 ? 'interesse' : 'interesses'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sharedInterests.map(interest => (
                    <Badge key={interest} variant="primary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {sharedGroups.length > 0 && (
              <div>
                <p className="text-sm text-ink-500 mb-2">
                  {sharedGroups.length} {sharedGroups.length === 1 ? 'grupo' : 'grupos'}
                </p>
                <div className="space-y-2">
                  {sharedGroups.map(group => (
                    <Link
                      key={group.id}
                      href={`/grupos/${group.id}`}
                      className="flex items-center gap-3 p-3 bg-ink-50 rounded-lg hover:bg-ink-100 transition-colors"
                    >
                      <Avatar src={group.photo} name={group.name} size="sm" />
                      <span className="font-medium text-ink-900">{group.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
