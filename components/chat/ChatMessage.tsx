'use client';

import Image from 'next/image';
import { MoreHorizontal, Reply, Smile } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { cn, formatRelativeTime } from '@/lib/utils';
import type { ChatMessage as ChatMessageType, User } from '@/lib/data';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
  showAvatar: boolean;
  onReply?: (message: ChatMessageType) => void;
  onReact?: (message: ChatMessageType, emoji: string) => void;
}

export function ChatMessage({ message, isOwn, showAvatar, onReply, onReact }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-2 group px-4',
        isOwn ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div className="w-8 flex-shrink-0">
        {showAvatar && !isOwn && (
          <Avatar src={message.user.photo} name={message.user.name} size="sm" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn('max-w-[70%] min-w-0', isOwn && 'items-end')}>
        {/* Name and time */}
        {showAvatar && !isOwn && (
          <div className="flex items-center gap-2 mb-1 ml-1">
            <span className="text-sm font-medium text-ink-900">{message.user.name}</span>
            <span className="text-xs text-ink-400">{formatRelativeTime(message.createdAt)}</span>
          </div>
        )}

        {/* Reply preview */}
        {message.replyTo && (
          <div
            className={cn(
              'flex items-center gap-2 mb-1 px-3 py-1.5 rounded-lg text-sm',
              isOwn ? 'bg-tomato-100 text-tomato-700' : 'bg-ink-100 text-ink-600'
            )}
          >
            <Reply className="w-3 h-3 rotate-180" />
            <span className="font-medium">{message.replyTo.user.name}:</span>
            <span className="truncate">{message.replyTo.content}</span>
          </div>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            'rounded-2xl px-4 py-2 inline-block',
            isOwn
              ? 'bg-tomato-500 text-white rounded-br-md'
              : 'bg-white border border-ink-100 text-ink-900 rounded-bl-md'
          )}
        >
          {message.content && (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}
        </div>

        {/* Image */}
        {message.image && (
          <div className="mt-2 rounded-xl overflow-hidden max-w-sm">
            <Image
              src={message.image}
              alt=""
              width={400}
              height={300}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className={cn('flex gap-1 mt-1', isOwn && 'justify-end')}>
            {message.reactions.map((reaction, i) => (
              <button
                key={i}
                className="flex items-center gap-1 px-2 py-0.5 bg-white border border-ink-100 rounded-full text-sm hover:bg-ink-50"
              >
                <span>{reaction.emoji}</span>
                <span className="text-ink-500">{reaction.users.length}</span>
              </button>
            ))}
          </div>
        )}

        {/* Time for own messages */}
        {isOwn && (
          <p className="text-xs text-ink-400 mt-1 text-right">
            {formatRelativeTime(message.createdAt)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div
        className={cn(
          'flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity',
          isOwn ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <button
          onClick={() => onReact?.(message, '❤️')}
          className="p-1.5 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-full"
        >
          <Smile className="w-4 h-4" />
        </button>
        <button
          onClick={() => onReply?.(message)}
          className="p-1.5 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-full"
        >
          <Reply className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
