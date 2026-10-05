'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Settings, 
  Plus, 
  Calendar, 
  Lightbulb, 
  Users, 
  MessageSquare,
  MoreHorizontal,
  Heart,
  Share2,
  MapPin,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { EventCard } from '@/components/encontros/EventCard';
import { CreateIdeaModal } from '@/components/grupos/CreateIdeaModal';
import { CreateEventModal } from '@/components/encontros/CreateEventModal';
import { 
  groups, 
  getGroupEvents, 
  getGroupIdeas, 
  getGroupPosts, 
  currentUser 
} from '@/lib/data';
import { formatRelativeTime, cn } from '@/lib/utils';

export default function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const group = groups.find(g => g.id === id);
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Grupo não encontrado</p>
      </div>
    );
  }

  const events = getGroupEvents(group.id);
  const ideas = getGroupIdeas(group.id);
  const posts = getGroupPosts(group.id);
  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');
  const openIdeas = ideas.filter(i => i.status === 'open' || i.status === 'planning');

  return (
    <div className="min-h-screen">
      {/* Header Image */}
      <div className="relative h-48 lg:h-64">
        <Image
          src={group.photo}
          alt={group.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Back button */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link
            href="/grupos"
            className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href={`/grupos/${group.id}/configuracoes`}
            className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        {/* Group info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white">{group.name}</h1>
            {group.isPrivate && <Lock className="w-5 h-5 text-white/80" />}
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {group.memberCount} membros
            </span>
            {group.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {group.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Description */}
        <p className="text-ink-600 mb-4">{group.description}</p>

        {/* Members preview */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href={`/grupos/${group.id}/membros`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <AvatarGroup
              users={group.members.map(m => m.user)}
              max={5}
              size="md"
            />
            <span className="text-sm text-ink-500">Ver todos</span>
          </Link>
          <Button variant="outline" size="sm">
            Convidar
          </Button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            variant="primary"
            leftIcon={<Calendar className="w-4 h-4" />}
            onClick={() => setShowEventModal(true)}
          >
            Criar encontro
          </Button>
          <Button 
            variant="outline"
            leftIcon={<Lightbulb className="w-4 h-4" />}
            onClick={() => setShowIdeaModal(true)}
          >
            Sugerir ideia
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="events">Encontros</TabsTrigger>
            <TabsTrigger value="ideas">Ideias</TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            {/* Upcoming Event Banner */}
            {upcomingEvents.length > 0 && (
              <Card className="bg-tomato-50 border-tomato-200" padding="md">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-tomato-600" />
                  <span className="text-sm font-medium text-tomato-700">Próximo encontro</span>
                </div>
                <Link href={`/encontros/${upcomingEvents[0].id}`}>
                  <h3 className="font-semibold text-ink-900 hover:text-tomato-600 transition-colors">
                    {upcomingEvents[0].title}
                  </h3>
                  <p className="text-sm text-ink-500">{upcomingEvents[0].location}</p>
                </Link>
              </Card>
            )}

            {/* Open Ideas */}
            {openIdeas.length > 0 && (
              <Card padding="md">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-ink-700">
                    {openIdeas.length} {openIdeas.length === 1 ? 'ideia aberta' : 'ideias abertas'}
                  </span>
                </div>
                <div className="space-y-2">
                  {openIdeas.slice(0, 2).map(idea => (
                    <div key={idea.id} className="flex items-center justify-between p-2 bg-ink-50 rounded-lg">
                      <div>
                        <p className="font-medium text-ink-900 text-sm">{idea.title}</p>
                        <p className="text-xs text-ink-500">
                          {idea.interestedUsers.length} interessados
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        +1
                      </Button>
                    </div>
                  ))}
                </div>
                <Link 
                  href={`/grupos/${group.id}/ideias`}
                  className="block text-center text-sm text-tomato-500 font-medium mt-3 hover:underline"
                >
                  Ver todas as ideias
                </Link>
              </Card>
            )}

            {/* Posts */}
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map(post => (
                  <Card key={post.id} padding="md">
                    <div className="flex items-start gap-3">
                      <Avatar src={post.user.photo} name={post.user.name} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-ink-900">{post.user.name}</span>
                            <span className="text-sm text-ink-400 ml-2">
                              {formatRelativeTime(post.createdAt)}
                            </span>
                          </div>
                          <button className="text-ink-400 hover:text-ink-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-ink-700 mt-2">{post.content}</p>
                        {post.images && post.images.length > 0 && (
                          <div className="mt-3 rounded-lg overflow-hidden">
                            <Image
                              src={post.images[0]}
                              alt=""
                              width={600}
                              height={400}
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-ink-100">
                          {post.reactions.map((reaction, i) => (
                            <button 
                              key={i}
                              className="flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700"
                            >
                              <span>{reaction.emoji}</span>
                              <span>{reaction.count}</span>
                            </button>
                          ))}
                          <button className="flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700">
                            <MessageSquare className="w-4 h-4" />
                            <span>Comentar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhuma publicação ainda</p>
                <p className="text-sm text-ink-400">Seja o primeiro a compartilhar algo!</p>
              </Card>
            )}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            {upcomingEvents.length > 0 && (
              <section>
                <h3 className="font-semibold text-ink-900 mb-3">Próximos</h3>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} showGroup={false} />
                  ))}
                </div>
              </section>
            )}

            {pastEvents.length > 0 && (
              <section>
                <h3 className="font-semibold text-ink-900 mb-3">Passados</h3>
                <div className="space-y-3">
                  {pastEvents.map(event => (
                    <EventCard key={event.id} event={event} showGroup={false} />
                  ))}
                </div>
              </section>
            )}

            {events.length === 0 && (
              <Card className="text-center py-12">
                <Calendar className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhum encontro ainda</p>
                <Button variant="ghost" className="mt-2" onClick={() => setShowEventModal(true)}>
                  <Plus className="w-4 h-4" />
                  Criar o primeiro encontro
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Ideas Tab */}
          <TabsContent value="ideas" className="space-y-4">
            <Button 
              variant="outline" 
              fullWidth 
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowIdeaModal(true)}
            >
              Nova ideia
            </Button>

            {ideas.length > 0 ? (
              <div className="space-y-3">
                {ideas.map(idea => (
                  <Card key={idea.id} padding="md" hover>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-ink-900">{idea.title}</h3>
                          <Badge 
                            variant={
                              idea.status === 'scheduled' ? 'success' :
                              idea.status === 'planning' ? 'warning' : 'default'
                            }
                            size="sm"
                          >
                            {idea.status === 'scheduled' ? 'Agendado' :
                             idea.status === 'planning' ? 'Planejando' : 'Aberta'}
                          </Badge>
                        </div>
                        {idea.description && (
                          <p className="text-sm text-ink-600 mb-2">{idea.description}</p>
                        )}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar src={idea.suggestedBy.photo} name={idea.suggestedBy.name} size="xs" />
                            <span className="text-xs text-ink-500">
                              {idea.suggestedBy.name} · {formatRelativeTime(idea.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Button
                          variant={idea.interestedUsers.some(u => u.id === currentUser.id) ? 'primary' : 'outline'}
                          size="sm"
                        >
                          {idea.interestedUsers.some(u => u.id === currentUser.id) ? '✓' : '+1'}
                        </Button>
                        <span className="text-xs text-ink-500">
                          {idea.interestedUsers.length}
                        </span>
                      </div>
                    </div>
                    {idea.interestedUsers.length >= 3 && idea.status === 'open' && (
                      <div className="mt-3 pt-3 border-t border-ink-100">
                        <Button variant="ghost" size="sm" fullWidth>
                          <Calendar className="w-4 h-4" />
                          Escolher data
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <Lightbulb className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhuma ideia ainda</p>
                <p className="text-sm text-ink-400">Sugira algo que vocês podem fazer juntos!</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CreateIdeaModal 
        isOpen={showIdeaModal} 
        onClose={() => setShowIdeaModal(false)} 
        groupId={group.id}
      />
      <CreateEventModal 
        isOpen={showEventModal} 
        onClose={() => setShowEventModal(false)} 
        groupId={group.id}
      />
    </div>
  );
}
