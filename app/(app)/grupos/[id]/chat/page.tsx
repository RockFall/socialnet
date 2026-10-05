'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Phone, Video, MoreVertical, Users, Info } from 'lucide-react';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { ChatContainer } from '@/components/chat';
import { groups, getGroupMessages, currentUser } from '@/lib/data';

export default function GroupChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const group = groups.find(g => g.id === id);
  const messages = getGroupMessages(id);

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Grupo não encontrado</p>
      </div>
    );
  }

  const onlineMembers = group.members.slice(0, 3);

  return (
    <div className="flex flex-col h-screen bg-cream-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-ink-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href={`/grupos/${group.id}`}
            className="p-2 -ml-2 text-ink-600 hover:text-ink-900 hover:bg-ink-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <Link href={`/grupos/${group.id}`} className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={group.photo}
                alt={group.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-semibold text-ink-900 text-sm">{group.name}</h1>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-ink-500">
                  {onlineMembers.length} online de {group.memberCount}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-ink-500 hover:text-ink-700 hover:bg-ink-100 rounded-full transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-ink-500 hover:text-ink-700 hover:bg-ink-100 rounded-full transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <Link 
            href={`/grupos/${group.id}`}
            className="p-2 text-ink-500 hover:text-ink-700 hover:bg-ink-100 rounded-full transition-colors"
          >
            <Info className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Group info bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-ink-100">
        <Link 
          href={`/grupos/${group.id}/membros`}
          className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700"
        >
          <Users className="w-4 h-4" />
          <AvatarGroup
            users={group.members.map(m => m.user)}
            max={4}
            size="xs"
          />
        </Link>
        {group.nextEvent && (
          <Link 
            href={`/encontros/${group.nextEvent.id}`}
            className="text-xs text-tomato-500 font-medium hover:underline"
          >
            Próximo: {group.nextEvent.title}
          </Link>
        )}
      </div>

      {/* Chat container */}
      <div className="flex-1 min-h-0">
        <ChatContainer
          messages={messages}
          currentUser={currentUser}
          groupId={group.id}
        />
      </div>
    </div>
  );
}
