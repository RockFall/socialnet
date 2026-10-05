'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10'
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl'
};

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Top-left person */}
          <circle cx="12" cy="10" r="4" fill="#DE392B" />
          <path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" fill="#DE392B" />
          
          {/* Top-right person */}
          <circle cx="28" cy="10" r="4" fill="#111111" />
          <path d="M22 20C22 16.6863 24.6863 14 28 14C31.3137 14 34 16.6863 34 20" fill="#111111" />
          
          {/* Bottom-left person */}
          <circle cx="12" cy="30" r="4" fill="#111111" />
          <path d="M6 40C6 36.6863 8.68629 34 12 34C15.3137 34 18 36.6863 18 40" fill="#111111" />
          
          {/* Bottom-right person */}
          <circle cx="28" cy="30" r="4" fill="#DE392B" />
          <path d="M22 40C22 36.6863 24.6863 34 28 34C31.3137 34 34 36.6863 34 40" fill="#DE392B" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-bold text-tomato-500', textSizeClasses[size])}>Rede</span>
          <span className={cn('font-bold text-ink-900', textSizeClasses[size])}>Social</span>
        </div>
      )}
    </Link>
  );
}
