'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Image as ImageIcon, X, Smile } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import type { ChatMessage, User } from '@/lib/data';

interface ChatInputProps {
  currentUser: User;
  replyingTo?: ChatMessage | null;
  onCancelReply?: () => void;
  onSend: (content: string, image?: string) => void;
  disabled?: boolean;
}

export function ChatInput({ 
  currentUser, 
  replyingTo, 
  onCancelReply, 
  onSend, 
  disabled 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickEmojis = ['❤️', '😂', '😮', '😢', '🔥', '👏', '🎉', '👍'];

  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  return (
    <div className="border-t border-ink-100 bg-white">
      {/* Reply preview */}
      {replyingTo && (
        <div className="flex items-center gap-3 px-4 py-2 bg-ink-50 border-b border-ink-100">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-ink-500">Respondendo a</p>
            <p className="text-sm font-medium text-ink-700 truncate">
              {replyingTo.user.name}: {replyingTo.content}
            </p>
          </div>
          <button
            onClick={onCancelReply}
            className="p-1 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-ink-100 bg-ink-50">
          {quickEmojis.map(emoji => (
            <button
              key={emoji}
              onClick={() => insertEmoji(emoji)}
              className="text-xl hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-2 p-3">
        <Avatar src={currentUser.photo} name={currentUser.name} size="sm" />
        
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva uma mensagem..."
            disabled={disabled}
            rows={1}
            className={cn(
              'w-full px-4 py-2 pr-20 rounded-2xl border border-ink-200',
              'focus:outline-none focus:ring-2 focus:ring-tomato-500 focus:border-transparent',
              'resize-none overflow-hidden text-ink-900 placeholder:text-ink-400',
              'disabled:bg-ink-50 disabled:cursor-not-allowed',
              'max-h-32'
            )}
            style={{ minHeight: '40px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
          
          {/* Action buttons inside input */}
          <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={cn(
                'p-1.5 rounded-full transition-colors',
                showEmojiPicker 
                  ? 'text-tomato-500 bg-tomato-50' 
                  : 'text-ink-400 hover:text-ink-600 hover:bg-ink-100'
              )}
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              className="p-1.5 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-full"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={cn(
            'p-2.5 rounded-full transition-colors',
            message.trim() && !disabled
              ? 'bg-tomato-500 text-white hover:bg-tomato-600'
              : 'bg-ink-100 text-ink-400 cursor-not-allowed'
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
