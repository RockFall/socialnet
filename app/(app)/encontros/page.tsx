'use client';

import { useState } from 'react';
import { Plus, Calendar, Clock, Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { EventCard } from '@/components/encontros/EventCard';
import { CreateEventModal } from '@/components/encontros/CreateEventModal';
import { getUpcomingEvents, getPastEvents } from '@/lib/data';
import { formatFullDate } from '@/lib/utils';

export default function EncontrosPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  const groupedUpcoming = upcomingEvents.reduce((acc, event) => {
    const dateKey = formatFullDate(event.date);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, typeof upcomingEvents>);

  return (
    <div className="min-h-screen">
      <Header title="Encontros" />
      
      <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink-900 hidden lg:block">Encontros</h1>
            <p className="text-ink-500 hidden lg:block">
              {upcomingEvents.length} {upcomingEvents.length === 1 ? 'encontro' : 'encontros'} marcado{upcomingEvents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Criar encontro
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="upcoming">
              Próximos ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Memórias ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {Object.entries(groupedUpcoming).length > 0 ? (
              Object.entries(groupedUpcoming).map(([date, events]) => (
                <section key={date}>
                  <h3 className="text-sm font-medium text-ink-500 uppercase tracking-wider mb-3">
                    {date}
                  </h3>
                  <div className="space-y-3">
                    {events.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <Card className="text-center py-12">
                <Calendar className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhum encontro marcado</p>
                <p className="text-sm text-ink-400 mb-4">Que tal organizar algo?</p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4" />
                  Criar encontro
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
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
      </div>

      <CreateEventModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
}
