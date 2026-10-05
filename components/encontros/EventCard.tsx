'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { cn, formatEventDate, formatShortDate } from '@/lib/utils';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import type { Event } from '@/lib/data';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact' | 'full';
  showGroup?: boolean;
}

export function EventCard({ event, variant = 'default', showGroup = true }: EventCardProps) {
  const goingCount = event.attendees.filter(a => a.status === 'going').length;
  const isPast = event.status === 'past';

  if (variant === 'compact') {
    return (
      <Link
        href={`/encontros/${event.id}`}
        className={cn(
          'flex items-center gap-3 p-3 bg-white rounded-xl border border-ink-100 hover:border-ink-200 hover:shadow-sm transition-all',
          isPast && 'opacity-75'
        )}
      >
        <div className={cn(
          'w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0',
          isPast ? 'bg-ink-100' : 'bg-tomato-50'
        )}>
          <span className={cn(
            'text-xs font-medium uppercase',
            isPast ? 'text-ink-500' : 'text-tomato-600'
          )}>
            {formatShortDate(event.date)}
          </span>
          <span className={cn(
            'text-lg font-bold',
            isPast ? 'text-ink-700' : 'text-tomato-600'
          )}>
            {event.date.getDate()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink-900 truncate">{event.title}</h3>
          <p className="text-sm text-ink-500 truncate">{event.location}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-ink-500">
          <Users className="w-4 h-4" />
          {goingCount}
        </div>
      </Link>
    );
  }

  if (variant === 'full') {
    return (
      <div className="bg-white rounded-xl border border-ink-100 overflow-hidden">
        {event.photo && (
          <div className="relative h-48">
            <Image
              src={event.photo}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-white mb-1">{event.title}</h2>
              {showGroup && event.group && (
                <p className="text-sm text-white/80">{event.group.name}</p>
              )}
            </div>
            {isPast && (
              <div className="absolute top-4 right-4">
                <Badge variant="default" size="md">Passado</Badge>
              </div>
            )}
          </div>
        )}
        <div className="p-4">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center gap-3 text-ink-600">
              <Calendar className="w-5 h-5 text-tomato-500" />
              <span>{formatEventDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-3 text-ink-600">
              <MapPin className="w-5 h-5 text-tomato-500" />
              <div>
                <span>{event.location}</span>
                {event.locationDetails && (
                  <p className="text-sm text-ink-400">{event.locationDetails}</p>
                )}
              </div>
            </div>
          </div>
          {event.description && (
            <p className="text-ink-600 mb-4">{event.description}</p>
          )}
          <div className="flex items-center justify-between pt-4 border-t border-ink-100">
            <div className="flex items-center gap-2">
              <AvatarGroup
                users={event.attendees.filter(a => a.status === 'going').map(a => a.user)}
                max={5}
                size="sm"
              />
              <span className="text-sm text-ink-500">
                {goingCount} {goingCount === 1 ? 'confirmado' : 'confirmados'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/encontros/${event.id}`}
      className={cn(
        'block bg-white rounded-xl border border-ink-100 overflow-hidden hover:border-ink-200 hover:shadow-sm transition-all',
        isPast && 'opacity-75'
      )}
    >
      {event.photo ? (
        <div className="relative h-36">
          <Image
            src={event.photo}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-semibold text-white truncate">{event.title}</h3>
            {showGroup && event.group && (
              <p className="text-sm text-white/80">{event.group.name}</p>
            )}
          </div>
          {isPast && event.memories && event.memories.length > 0 && (
            <div className="absolute top-3 right-3">
              <Badge variant="primary" size="sm">
                {event.memories.length} {event.memories.length === 1 ? 'memória' : 'memórias'}
              </Badge>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 pb-0">
          <h3 className="font-semibold text-ink-900">{event.title}</h3>
          {showGroup && event.group && (
            <p className="text-sm text-ink-500">{event.group.name}</p>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-4 text-sm text-ink-500 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatShortDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {event.location}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <AvatarGroup
            users={event.attendees.filter(a => a.status === 'going').map(a => a.user)}
            max={4}
            size="xs"
          />
          <span className="text-xs text-ink-400">
            {goingCount} {goingCount === 1 ? 'vai' : 'vão'}
          </span>
        </div>
      </div>
    </Link>
  );
}
