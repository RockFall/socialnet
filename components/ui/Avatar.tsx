'use client';

import Image from 'next/image';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBorder?: boolean;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-24 h-24 text-2xl'
};

export function Avatar({ src, name, size = 'md', className, showBorder }: AvatarProps) {
  const initials = getInitials(name);
  
  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden flex-shrink-0',
        'bg-gradient-to-br from-tomato-400 to-tomato-600',
        'flex items-center justify-center font-semibold text-white',
        showBorder && 'ring-2 ring-white',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

interface AvatarGroupProps {
  users: { photo?: string; name: string }[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function AvatarGroup({ users, max = 4, size = 'sm' }: AvatarGroupProps) {
  const displayed = users.slice(0, max);
  const remaining = users.length - max;
  
  const overlapClasses = {
    xs: '-ml-1.5',
    sm: '-ml-2',
    md: '-ml-2.5',
    lg: '-ml-3'
  };
  
  return (
    <div className="flex items-center">
      {displayed.map((user, i) => (
        <Avatar
          key={i}
          src={user.photo}
          name={user.name}
          size={size}
          showBorder
          className={i > 0 ? overlapClasses[size] : ''}
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'rounded-full bg-ink-200 flex items-center justify-center font-medium text-ink-700 ring-2 ring-white',
            overlapClasses[size],
            sizeClasses[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
