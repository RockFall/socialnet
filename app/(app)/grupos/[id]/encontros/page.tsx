'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { EventCard } from '@/components/encontros/EventCard';
import { CreateEventModal } from '@/components/encontros/CreateEventModal';
import { groups, getGroupEvents } from '@/lib/data';

export default function EncontrosGrupoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const group = groups.find(g => g.id === id);
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Grupo não encontrado</p>
      </div>
    );
  }

  const events = getGroupEvents(group.id);
  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-ink-100 z-30">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/grupos/${group.id}`}
              className="p-2 -ml-2 text-ink-500 hover:text-ink-700 hover:bg-ink-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-semibold text-ink-900">Encontros</h1>
              <p className="text-xs text-ink-500">{group.name}</p>
            </div>
          </div>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowCreateModal(true)}>
            Criar
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="upcoming">Próximos ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Memórias ({pastEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} showGroup={false} />
              ))
            ) : (
              <Card className="text-center py-12">
                <Calendar className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhum encontro marcado</p>
                <Button variant="ghost" className="mt-2" onClick={() => setShowCreateModal(true)}>
                  Criar primeiro encontro
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} showGroup={false} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <Clock className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhuma memória ainda</p>
                <p className="text-sm text-ink-400">
                  Os encontros passados aparecem aqui como memórias
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CreateEventModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        groupId={group.id}
      />
    </div>
  );
}
