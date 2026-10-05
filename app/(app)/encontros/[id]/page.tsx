'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock,
  Users,
  Share2,
  MoreHorizontal,
  Check,
  HelpCircle,
  X,
  MessageSquare,
  Camera,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Input';
import { events, currentUser } from '@/lib/data';
import { formatEventDate, formatRelativeTime, cn } from '@/lib/utils';

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = events.find(e => e.id === id);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showAddMemoryModal, setShowAddMemoryModal] = useState(false);
  const [userStatus, setUserStatus] = useState<'going' | 'maybe' | 'declined' | null>(
    event?.attendees.find(a => a.user.id === currentUser.id)?.status || null
  );

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Encontro não encontrado</p>
      </div>
    );
  }

  const isPast = event.status === 'past';
  const goingUsers = event.attendees.filter(a => a.status === 'going');
  const maybeUsers = event.attendees.filter(a => a.status === 'maybe');

  const handleRSVP = (status: 'going' | 'maybe' | 'declined') => {
    setUserStatus(status);
    setShowRSVPModal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header Image */}
      <div className="relative h-64 lg:h-80">
        {event.photo ? (
          <Image
            src={event.photo}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-tomato-400 to-tomato-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link
            href="/encontros"
            className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Event info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          {isPast && (
            <Badge variant="default" className="mb-2">Encontro passado</Badge>
          )}
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">{event.title}</h1>
          {event.group && (
            <Link 
              href={`/grupos/${event.group.id}`}
              className="text-white/80 hover:text-white transition-colors"
            >
              {event.group.name}
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Event Details */}
        <Card padding="lg" className="mb-6">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-4 text-ink-700">
              <div className="w-10 h-10 bg-tomato-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-tomato-500" />
              </div>
              <div>
                <p className="font-medium">{formatEventDate(event.date)}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-ink-700">
              <div className="w-10 h-10 bg-tomato-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-tomato-500" />
              </div>
              <div>
                <p className="font-medium">{event.location}</p>
                {event.locationDetails && (
                  <p className="text-sm text-ink-500">{event.locationDetails}</p>
                )}
                <button className="text-sm text-tomato-500 hover:underline mt-1">
                  Ver no mapa
                </button>
              </div>
            </div>
          </div>

          {event.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-ink-900 mb-2">Sobre</h3>
              <p className="text-ink-600">{event.description}</p>
            </div>
          )}

          {/* RSVP Section */}
          {!isPast && (
            <div className="border-t border-ink-100 pt-6">
              <h3 className="font-semibold text-ink-900 mb-4">Você vai?</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleRSVP('going')}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    userStatus === 'going'
                      ? 'border-green-500 bg-green-50'
                      : 'border-ink-100 hover:border-ink-200'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    userStatus === 'going' ? 'bg-green-500 text-white' : 'bg-ink-100 text-ink-500'
                  )}>
                    <Check className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    'font-medium',
                    userStatus === 'going' ? 'text-green-700' : 'text-ink-600'
                  )}>Vou</span>
                </button>

                <button
                  onClick={() => handleRSVP('maybe')}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    userStatus === 'maybe'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-ink-100 hover:border-ink-200'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    userStatus === 'maybe' ? 'bg-amber-500 text-white' : 'bg-ink-100 text-ink-500'
                  )}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    'font-medium',
                    userStatus === 'maybe' ? 'text-amber-700' : 'text-ink-600'
                  )}>Talvez</span>
                </button>

                <button
                  onClick={() => handleRSVP('declined')}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    userStatus === 'declined'
                      ? 'border-red-500 bg-red-50'
                      : 'border-ink-100 hover:border-ink-200'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    userStatus === 'declined' ? 'bg-red-500 text-white' : 'bg-ink-100 text-ink-500'
                  )}>
                    <X className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    'font-medium',
                    userStatus === 'declined' ? 'text-red-700' : 'text-ink-600'
                  )}>Não vou</span>
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* Attendees & Memories Tabs */}
        <Tabs defaultValue={isPast ? 'memories' : 'attendees'}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="attendees">
              Participantes ({goingUsers.length + maybeUsers.length})
            </TabsTrigger>
            {isPast && (
              <TabsTrigger value="memories">
                Memórias ({event.memories?.length || 0})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="attendees" className="space-y-6">
            {goingUsers.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-ink-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Confirmados ({goingUsers.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {goingUsers.map(({ user }) => (
                    <Link
                      key={user.id}
                      href={`/perfil/${user.id}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-ink-100 hover:border-ink-200 transition-all"
                    >
                      <Avatar src={user.photo} name={user.name} size="md" />
                      <span className="font-medium text-ink-900 truncate">{user.name}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {maybeUsers.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-ink-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  Talvez ({maybeUsers.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {maybeUsers.map(({ user }) => (
                    <Link
                      key={user.id}
                      href={`/perfil/${user.id}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-ink-100 hover:border-ink-200 transition-all"
                    >
                      <Avatar src={user.photo} name={user.name} size="md" />
                      <span className="font-medium text-ink-900 truncate">{user.name}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </TabsContent>

          {isPast && (
            <TabsContent value="memories" className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Camera className="w-4 h-4" />}
                onClick={() => setShowAddMemoryModal(true)}
              >
                Adicionar memória
              </Button>

              {event.memories && event.memories.length > 0 ? (
                <div className="space-y-4">
                  {event.memories.map(memory => (
                    <Card key={memory.id} padding="md">
                      <div className="flex items-start gap-3">
                        <Avatar src={memory.user.photo} name={memory.user.name} size="md" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-ink-900">{memory.user.name}</span>
                            <span className="text-sm text-ink-400">
                              {formatRelativeTime(memory.createdAt)}
                            </span>
                          </div>
                          {memory.type === 'photo' && (
                            <div className="mt-3 rounded-lg overflow-hidden">
                              <Image
                                src={memory.content}
                                alt={memory.caption || ''}
                                width={600}
                                height={400}
                                className="w-full h-auto"
                              />
                              {memory.caption && (
                                <p className="mt-2 text-ink-600">{memory.caption}</p>
                              )}
                            </div>
                          )}
                          {memory.type === 'highlight' && (
                            <p className="mt-2 text-ink-700 bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
                              {memory.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <Camera className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                  <p className="text-ink-500">Nenhuma memória ainda</p>
                  <p className="text-sm text-ink-400">Compartilhe fotos e momentos desse encontro!</p>
                </Card>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Add Memory Modal */}
      <Modal
        isOpen={showAddMemoryModal}
        onClose={() => setShowAddMemoryModal(false)}
        title="Adicionar memória"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-ink-200 rounded-xl hover:border-tomato-500 hover:bg-tomato-50 transition-all">
              <Camera className="w-8 h-8 text-ink-400" />
              <span className="text-sm font-medium text-ink-600">Foto</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-ink-200 rounded-xl hover:border-tomato-500 hover:bg-tomato-50 transition-all">
              <MessageSquare className="w-8 h-8 text-ink-400" />
              <span className="text-sm font-medium text-ink-600">Destaque</span>
            </button>
          </div>

          <Textarea
            label="Legenda (opcional)"
            placeholder="Escreva algo sobre esse momento..."
            rows={3}
          />

          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setShowAddMemoryModal(false)}>
              Cancelar
            </Button>
            <Button fullWidth>
              Adicionar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
