'use client';

import Link from 'next/link';
import { Plus, ChevronRight, Sparkles, Users, Calendar, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { GroupCard } from '@/components/grupos/GroupCard';
import { EventCard } from '@/components/encontros/EventCard';
import { 
  currentUser, 
  groups, 
  getUpcomingEvents, 
  invites, 
  suggestedGroups,
  ideas 
} from '@/lib/data';
import { formatShortDate } from '@/lib/utils';

export default function HomePage() {
  const userGroups = groups.filter(g => g.members.some(m => m.user.id === currentUser.id));
  const upcomingEvents = getUpcomingEvents().slice(0, 3);
  const pendingIdeas = ideas.filter(i => i.status === 'open' || i.status === 'planning').slice(0, 2);

  return (
    <div className="min-h-screen">
      <Header showSearch />
      
      <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8 space-y-8">
        {/* Welcome */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink-900">
              Olá, {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-ink-500">O que vamos fazer hoje?</p>
          </div>
          <Avatar src={currentUser.photo} name={currentUser.name} size="lg" />
        </div>

        {/* Invites Banner */}
        {invites.length > 0 && (
          <Link href="/convites">
            <Card className="bg-tomato-50 border-tomato-200" hover padding="md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-tomato-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-tomato-600" />
                  </div>
                  <div>
                    <p className="font-medium text-tomato-900">
                      Você tem {invites.length} {invites.length === 1 ? 'convite' : 'convites'} pendente{invites.length > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-tomato-700">Toque para ver</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-tomato-600" />
              </div>
            </Card>
          </Link>
        )}

        {/* Upcoming Events */}
        <section>
          <CardHeader>
            <CardTitle className="text-lg">Próximos Encontros</CardTitle>
            <Link href="/encontros" className="text-sm text-tomato-500 font-medium flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} variant="compact" />
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <Calendar className="w-12 h-12 text-ink-300 mx-auto mb-3" />
              <p className="text-ink-500">Nenhum encontro marcado</p>
              <Button variant="ghost" className="mt-2">
                <Plus className="w-4 h-4" />
                Criar encontro
              </Button>
            </Card>
          )}
        </section>

        {/* Pending Ideas */}
        {pendingIdeas.length > 0 && (
          <section>
            <CardHeader>
              <CardTitle className="text-lg">Ideias do Grupo</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {pendingIdeas.map(idea => (
                <Card key={idea.id} hover padding="md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-ink-900">{idea.title}</h3>
                        <Badge 
                          variant={idea.status === 'planning' ? 'warning' : 'default'}
                          size="sm"
                        >
                          {idea.status === 'planning' ? 'Planejando' : 'Aberta'}
                        </Badge>
                      </div>
                      <p className="text-sm text-ink-500 mb-2">
                        Sugerido por {idea.suggestedBy.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-400">
                          {idea.interestedUsers.length} interessado{idea.interestedUsers.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Tenho interesse
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Your Groups */}
        <section>
          <CardHeader>
            <CardTitle className="text-lg">Seus Grupos</CardTitle>
            <Link href="/grupos" className="text-sm text-tomato-500 font-medium flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userGroups.slice(0, 4).map(group => (
              <GroupCard key={group.id} group={group} variant="compact" />
            ))}
          </div>
          <Button 
            variant="outline" 
            fullWidth 
            className="mt-4"
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Criar novo grupo
          </Button>
        </section>

        {/* Discover */}
        <section>
          <CardHeader>
            <div>
              <CardTitle className="text-lg">Descubra</CardTitle>
              <p className="text-sm text-ink-500">Grupos que combinam com você</p>
            </div>
            <Link href="/descobrir" className="text-sm text-tomato-500 font-medium flex items-center gap-1">
              Ver mais <ChevronRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <div className="space-y-3">
            {suggestedGroups.slice(0, 2).map(group => (
              <GroupCard key={group.id} group={group} variant="horizontal" showMembers={false} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
