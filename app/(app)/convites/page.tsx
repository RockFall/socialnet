'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Users, Calendar, Check, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { invites } from '@/lib/data';
import { formatEventDate, formatRelativeTime } from '@/lib/utils';

export default function ConvitesPage() {
  const [processedInvites, setProcessedInvites] = useState<string[]>([]);

  const pendingInvites = invites.filter(inv => !processedInvites.includes(inv.id));

  const handleAccept = (inviteId: string) => {
    setProcessedInvites(prev => [...prev, inviteId]);
  };

  const handleDecline = (inviteId: string) => {
    setProcessedInvites(prev => [...prev, inviteId]);
  };

  return (
    <div className="min-h-screen">
      <Header title="Convites" />
      
      <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink-900 hidden lg:block">Convites</h1>
          <p className="text-ink-500 hidden lg:block">
            {pendingInvites.length} {pendingInvites.length === 1 ? 'convite pendente' : 'convites pendentes'}
          </p>
        </div>

        {pendingInvites.length > 0 ? (
          <div className="space-y-4">
            {pendingInvites.map(invite => (
              <Card key={invite.id} padding="lg">
                <div className="flex items-start gap-4">
                  {/* Icon/Image */}
                  <div className="flex-shrink-0">
                    {invite.type === 'group' && invite.group ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                        <Image
                          src={invite.group.photo}
                          alt={invite.group.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : invite.type === 'event' && invite.event ? (
                      <div className="w-16 h-16 bg-tomato-50 rounded-xl flex flex-col items-center justify-center">
                        <Calendar className="w-6 h-6 text-tomato-500" />
                      </div>
                    ) : null}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={invite.type === 'group' ? 'primary' : 'warning'}>
                        {invite.type === 'group' ? 'Grupo' : 'Encontro'}
                      </Badge>
                      <span className="text-sm text-ink-400">
                        {formatRelativeTime(invite.createdAt)}
                      </span>
                    </div>

                    {invite.type === 'group' && invite.group && (
                      <>
                        <h3 className="font-semibold text-ink-900 mb-1">
                          {invite.group.name}
                        </h3>
                        <p className="text-sm text-ink-600 line-clamp-2 mb-2">
                          {invite.group.description}
                        </p>
                        <p className="text-sm text-ink-500">
                          {invite.group.memberCount} membros
                        </p>
                      </>
                    )}

                    {invite.type === 'event' && invite.event && (
                      <>
                        <h3 className="font-semibold text-ink-900 mb-1">
                          {invite.event.title}
                        </h3>
                        <p className="text-sm text-ink-600 mb-1">
                          {formatEventDate(invite.event.date)}
                        </p>
                        <p className="text-sm text-ink-500">
                          {invite.event.location}
                        </p>
                      </>
                    )}

                    <div className="flex items-center gap-2 mt-3">
                      <Avatar src={invite.invitedBy.photo} name={invite.invitedBy.name} size="xs" />
                      <span className="text-sm text-ink-500">
                        Convidado por <strong>{invite.invitedBy.name}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-ink-100">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleDecline(invite.id)}
                  >
                    Recusar
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => handleAccept(invite.id)}
                  >
                    Aceitar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title="Nenhum convite"
            description="Quando alguém te convidar para um grupo ou encontro, aparecerá aqui."
          />
        )}
      </div>
    </div>
  );
}
