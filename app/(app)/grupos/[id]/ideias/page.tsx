'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Lightbulb, Calendar, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { CreateIdeaModal } from '@/components/grupos/CreateIdeaModal';
import { groups, getGroupIdeas, currentUser } from '@/lib/data';
import { formatRelativeTime, cn } from '@/lib/utils';

export default function IdeiasPage({ params }: { params: Promise<{ id: string }> }) {
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

  const ideas = getGroupIdeas(group.id);
  const openIdeas = ideas.filter(i => i.status === 'open');
  const planningIdeas = ideas.filter(i => i.status === 'planning');
  const doneIdeas = ideas.filter(i => i.status === 'scheduled' || i.status === 'done');

  const IdeaCard = ({ idea }: { idea: typeof ideas[0] }) => {
    const isInterested = idea.interestedUsers.some(u => u.id === currentUser.id);
    
    return (
      <Card padding="md" className="group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-ink-900">{idea.title}</h3>
              <Badge 
                variant={
                  idea.status === 'scheduled' ? 'success' :
                  idea.status === 'planning' ? 'warning' : 'default'
                }
                size="sm"
              >
                {idea.status === 'scheduled' ? 'Agendado' :
                 idea.status === 'planning' ? 'Planejando' :
                 idea.status === 'done' ? 'Feito' : 'Aberta'}
              </Badge>
            </div>
            
            {idea.description && (
              <p className="text-sm text-ink-600 mb-3">{idea.description}</p>
            )}

            <div className="flex items-center gap-2 mb-3">
              <Avatar src={idea.suggestedBy.photo} name={idea.suggestedBy.name} size="xs" />
              <span className="text-xs text-ink-500">
                {idea.suggestedBy.name} · {formatRelativeTime(idea.createdAt)}
              </span>
            </div>

            {idea.interestedUsers.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {idea.interestedUsers.slice(0, 4).map(user => (
                    <Avatar 
                      key={user.id} 
                      src={user.photo} 
                      name={user.name} 
                      size="xs"
                      showBorder
                    />
                  ))}
                </div>
                <span className="text-xs text-ink-500">
                  {idea.interestedUsers.length} interessado{idea.interestedUsers.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <Button
              variant={isInterested ? 'primary' : 'outline'}
              size="sm"
              className="min-w-[48px]"
            >
              {isInterested ? <Check className="w-4 h-4" /> : '+1'}
            </Button>
          </div>
        </div>

        {idea.interestedUsers.length >= 3 && idea.status === 'open' && (
          <div className="mt-4 pt-4 border-t border-ink-100">
            <Button variant="ghost" size="sm" fullWidth className="text-tomato-600">
              <Calendar className="w-4 h-4" />
              Escolher data e transformar em encontro
            </Button>
          </div>
        )}

        {idea.status === 'planning' && (
          <div className="mt-4 pt-4 border-t border-ink-100 bg-amber-50 -mx-4 -mb-4 p-4 rounded-b-xl">
            <p className="text-sm text-amber-800 mb-2 font-medium">Escolhendo data</p>
            <div className="grid grid-cols-3 gap-2">
              {['Sáb, 12/10', 'Dom, 13/10', 'Sáb, 19/10'].map((date, i) => (
                <button
                  key={i}
                  className={cn(
                    'p-2 rounded-lg text-xs font-medium transition-all',
                    i === 0 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-white text-ink-600 hover:bg-amber-100'
                  )}
                >
                  {date}
                  <span className="block text-[10px] opacity-75">
                    {i === 0 ? '3 votos' : i === 1 ? '2 votos' : '1 voto'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>
    );
  };

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
              <h1 className="font-semibold text-ink-900">Ideias</h1>
              <p className="text-xs text-ink-500">{group.name}</p>
            </div>
          </div>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowCreateModal(true)}>
            Nova ideia
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <Tabs defaultValue="open" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="open">Abertas ({openIdeas.length})</TabsTrigger>
            <TabsTrigger value="planning">Planejando ({planningIdeas.length})</TabsTrigger>
            <TabsTrigger value="done">Realizadas ({doneIdeas.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="space-y-4">
            {openIdeas.length > 0 ? (
              openIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)
            ) : (
              <Card className="text-center py-12">
                <Lightbulb className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhuma ideia aberta</p>
                <Button variant="ghost" className="mt-2" onClick={() => setShowCreateModal(true)}>
                  Sugerir primeira ideia
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="planning" className="space-y-4">
            {planningIdeas.length > 0 ? (
              planningIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)
            ) : (
              <Card className="text-center py-12">
                <Calendar className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhuma ideia em planejamento</p>
                <p className="text-sm text-ink-400">
                  Ideias com 3+ interessados podem ter uma data escolhida
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="done" className="space-y-4">
            {doneIdeas.length > 0 ? (
              doneIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)
            ) : (
              <Card className="text-center py-12">
                <Check className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">Nenhuma ideia realizada ainda</p>
                <p className="text-sm text-ink-400">
                  As ideias que viraram encontros aparecem aqui
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CreateIdeaModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        groupId={group.id}
      />
    </div>
  );
}
