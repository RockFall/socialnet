'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType, User } from '@/lib/data';

interface ChatContainerProps {
  messages: ChatMessageType[];
  currentUser: User;
  groupId: string;
}

export function ChatContainer({ messages, currentUser, groupId }: ChatContainerProps) {
  const [localMessages, setLocalMessages] = useState(messages);
  const [replyingTo, setReplyingTo] = useState<ChatMessageType | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom('auto');
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const handleSend = (content: string) => {
    const newMessage: ChatMessageType = {
      id: `msg-new-${Date.now()}`,
      groupId,
      user: currentUser,
      content,
      createdAt: new Date(),
      readBy: [currentUser.id],
      ...(replyingTo && {
        replyTo: {
          id: replyingTo.id,
          user: replyingTo.user,
          content: replyingTo.content
        }
      })
    };

    setLocalMessages(prev => [...prev, newMessage]);
    setReplyingTo(null);
  };

  const handleReply = (message: ChatMessageType) => {
    setReplyingTo(message);
  };

  const handleReact = (message: ChatMessageType, emoji: string) => {
    setLocalMessages(prev =>
      prev.map(m => {
        if (m.id !== message.id) return m;

        const existingReactions = m.reactions || [];
        const existingReactionIndex = existingReactions.findIndex(r => r.emoji === emoji);

        if (existingReactionIndex === -1) {
          return {
            ...m,
            reactions: [...existingReactions, { emoji, users: [currentUser] }]
          };
        }

        const existingReaction = existingReactions[existingReactionIndex];
        const userAlreadyReacted = existingReaction.users.some(u => u.id === currentUser.id);

        if (userAlreadyReacted) {
          const newUsers = existingReaction.users.filter(u => u.id !== currentUser.id);
          if (newUsers.length === 0) {
            return {
              ...m,
              reactions: existingReactions.filter((_, i) => i !== existingReactionIndex)
            };
          }
          return {
            ...m,
            reactions: existingReactions.map((r, i) =>
              i === existingReactionIndex ? { ...r, users: newUsers } : r
            )
          };
        }

        return {
          ...m,
          reactions: existingReactions.map((r, i) =>
            i === existingReactionIndex
              ? { ...r, users: [...r.users, currentUser] }
              : r
          )
        };
      })
    );
  };

  const shouldShowAvatar = (message: ChatMessageType, index: number) => {
    if (index === 0) return true;
    const prevMessage = localMessages[index - 1];
    return prevMessage.user.id !== message.user.id;
  };

  const groupMessagesByDate = (msgs: ChatMessageType[]) => {
    const groups: { date: string; messages: ChatMessageType[] }[] = [];
    
    msgs.forEach(msg => {
      const dateStr = formatDateHeader(msg.createdAt);
      const lastGroup = groups[groups.length - 1];
      
      if (lastGroup && lastGroup.date === dateStr) {
        lastGroup.messages.push(msg);
      } else {
        groups.push({ date: dateStr, messages: [msg] });
      }
    });
    
    return groups;
  };

  const formatDateHeader = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (msgDate.getTime() === today.getTime()) {
      return 'Hoje';
    } else if (msgDate.getTime() === yesterday.getTime()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  const messageGroups = groupMessagesByDate(localMessages);

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto bg-cream-50"
      >
        <div className="py-4 space-y-4">
          {messageGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Date separator */}
              <div className="flex items-center justify-center my-4">
                <div className="px-3 py-1 text-xs text-ink-500 bg-white rounded-full shadow-sm border border-ink-100">
                  {group.date}
                </div>
              </div>
              
              {/* Messages for this date */}
              <div className="space-y-2">
                {group.messages.map((message, index) => {
                  const globalIndex = localMessages.indexOf(message);
                  return (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isOwn={message.user.id === currentUser.id}
                      showAvatar={shouldShowAvatar(message, globalIndex)}
                      onReply={handleReply}
                      onReact={handleReact}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <ChatInput
        currentUser={currentUser}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
        onSend={handleSend}
      />
    </div>
  );
}
