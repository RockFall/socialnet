'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Lock, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AvatarGroup } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface GroupMember {
  user: {
    id: string;
    name: string;
    photo: string | null;
  };
  role: string;
}

interface GroupCardGroup {
  id: string;
  name: string;
  description: string;
  photo: string;
  type: string;
  location?: string | null;
  isPrivate: boolean;
  memberCount: number;
  members: GroupMember[];
}

interface GroupCardProps {
  group: GroupCardGroup;
  variant?: 'default' | 'compact' | 'horizontal';
  showMembers?: boolean;
  unreadCount?: number;
}

export function GroupCard({ group, variant = 'default', showMembers = true, unreadCount = 0 }: GroupCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/grupos/${group.id}`}
        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-ink-100 hover:border-ink-200 hover:shadow-sm transition-all"
      >
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={group.photo}
            alt={group.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-ink-900 truncate">{group.name}</h3>
            {group.isPrivate && <Lock className="w-3.5 h-3.5 text-ink-400" />}
          </div>
          <p className="text-sm text-ink-500">
            {group.memberCount} {group.memberCount === 1 ? 'pessoa' : 'pessoas'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Link
            href={`/grupos/${group.id}/chat`}
            className="relative p-2 text-tomato-500 hover:bg-tomato-50 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-tomato-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </Link>
        )}
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/grupos/${group.id}`}
        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-ink-100 hover:border-ink-200 hover:shadow-sm transition-all"
      >
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={group.photo}
            alt={group.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-ink-900 truncate">{group.name}</h3>
            {group.isPrivate && <Lock className="w-3.5 h-3.5 text-ink-400" />}
          </div>
          <p className="text-sm text-ink-500 line-clamp-1 mb-2">{group.description}</p>
          <div className="flex items-center gap-3 text-sm text-ink-500">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {group.memberCount}
            </span>
            {group.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {group.location}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  const membersForAvatar = group.members.map(m => ({
    id: m.user.id,
    name: m.user.name,
    photo: m.user.photo || '',
  }));

  return (
    <Link
      href={`/grupos/${group.id}`}
      className="block bg-white rounded-xl border border-ink-100 overflow-hidden hover:border-ink-200 hover:shadow-sm transition-all"
    >
      <div className="relative h-32">
        <Image
          src={group.photo}
          alt={group.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">{group.name}</h3>
            {group.isPrivate && <Lock className="w-4 h-4 text-white/80" />}
          </div>
        </div>
        {group.type !== 'friends' && (
          <div className="absolute top-3 right-3">
            <Badge variant={group.type === 'local' ? 'warning' : 'primary'} size="sm">
              {group.type === 'local' ? 'Local' : group.type === 'interest' ? 'Interesse' : 'Evento'}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-ink-600 line-clamp-2 mb-3">{group.description}</p>
        <div className="flex items-center justify-between">
          {showMembers && membersForAvatar.length > 0 && (
            <AvatarGroup
              users={membersForAvatar}
              max={4}
              size="sm"
            />
          )}
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Link
                href={`/grupos/${group.id}/chat`}
                className="relative p-1.5 text-tomato-500 hover:bg-tomato-50 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-tomato-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </Link>
            )}
            <span className="text-sm text-ink-500 flex items-center gap-1">
              <Users className="w-4 h-4" />
              {group.memberCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
