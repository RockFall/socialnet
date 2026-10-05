'use client';

import Link from 'next/link';
import { 
  Settings, 
  MapPin, 
  Camera,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { GroupCard } from '@/components/grupos/GroupCard';
import { EventCard } from '@/components/encontros/EventCard';
import { currentUser, groups, events } from '@/lib/data';
import { formatRelativeTime } from '@/lib/utils';

export default function PerfilPage() {
  const userGroups = groups.filter(g => g.members.some(m => m.user.id === currentUser.id));
  const userEvents = events.filter(e => 
    e.attendees.some(a => a.user.id === currentUser.id && a.status === 'going')
  );
  const pastEvents = userEvents.filter(e => e.status === 'past');
  const upcomingEvents = userEvents.filter(e => e.status === 'upcoming');

  return (
    <div className="min-h-screen">
      <Header 
        title="Perfil" 
        actions={
          <Link href="/perfil/editar" className="p-2 text-ink-500 hover:text-ink-700">
            <Settings className="w-5 h-5" />
          </Link>
        }
      />
      
      <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
        {/* Profile Header */}
        <Card padding="lg" className="mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <Avatar src={currentUser.photo} name={currentUser.name} size="2xl" />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-tomato-500 text-white rounded-full flex items-center justify-center hover:bg-tomato-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-ink-900 mb-1">{currentUser.name}</h1>
              {currentUser.location && (
                <p className="text-ink-500 flex items-center justify-center sm:justify-start gap-1 mb-3">
                  <MapPin className="w-4 h-4" />
                  {currentUser.location}
                </p>
              )}
              <p className="text-ink-600 mb-4">{currentUser.bio}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {currentUser.interests.map(interest => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-ink-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-ink-900">{userGroups.length}</p>
              <p className="text-sm text-ink-500">grupos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-ink-900">{pastEvents.length}</p>
              <p className="text-sm text-ink-500">encontros</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-ink-900">1</p>
              <p className="text-sm text-ink-500">ano</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="groups">Grupos ({userGroups.length})</TabsTrigger>
            <TabsTrigger value="memories">Memórias ({pastEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            {userGroups.map(group => (
              <GroupCard key={group.id} group={group} variant="horizontal" />
            ))}
          </TabsContent>

          <TabsContent value="memories" className="space-y-4">
            {pastEvents.length > 0 ? (
              pastEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <Card className="text-center py-12">
                <Clock className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhuma memória ainda</p>
                <p className="text-sm text-ink-400">
                  Os encontros que você participar aparecerão aqui
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mt-8">
            <CardHeader>
              <CardTitle>Próximos Encontros</CardTitle>
              <Link href="/encontros" className="text-sm text-tomato-500 font-medium flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 2).map(event => (
                <EventCard key={event.id} event={event} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
