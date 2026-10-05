import { format, formatDistanceToNow, isToday, isTomorrow, isThisWeek, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatEventDate(date: Date): string {
  if (isToday(date)) {
    return `Hoje, ${format(date, 'HH:mm', { locale: ptBR })}`;
  }
  if (isTomorrow(date)) {
    return `Amanhã, ${format(date, 'HH:mm', { locale: ptBR })}`;
  }
  if (isThisWeek(date)) {
    return format(date, "EEEE, HH:mm", { locale: ptBR });
  }
  return format(date, "d 'de' MMMM, HH:mm", { locale: ptBR });
}

export function formatShortDate(date: Date): string {
  if (isToday(date)) {
    return 'Hoje';
  }
  if (isTomorrow(date)) {
    return 'Amanhã';
  }
  const days = differenceInDays(date, new Date());
  if (days > 0 && days <= 7) {
    return format(date, 'EEEE', { locale: ptBR });
  }
  return format(date, "d 'de' MMM", { locale: ptBR });
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
}

export function formatFullDate(date: Date): string {
  return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}
