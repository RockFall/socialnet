'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { GroupCard } from '@/components/grupos/GroupCard';
import { CreateGroupModal } from '@/components/grupos/CreateGroupModal';
import type { GroupWithDetails } from '@/lib/queries';

interface GruposClientProps {
  groups: GroupWithDetails[];
}

export function GruposClient({ groups }: GruposClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const friendsGroups = filteredGroups.filter(g => g.type === 'friends');
  const interestGroups = filteredGroups.filter(g => g.type === 'interest');
  const localGroups = filteredGroups.filter(g => g.type === 'local');
  const eventGroups = filteredGroups.filter(g => g.type === 'event');

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink-900 hidden lg:block">Seus Grupos</h1>
            <p className="text-ink-500 hidden lg:block">
              {groups.length} {groups.length === 1 ? 'grupo' : 'grupos'}
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Criar grupo
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Buscar nos seus grupos..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="all">Todos ({filteredGroups.length})</TabsTrigger>
            <TabsTrigger value="friends">Amigos ({friendsGroups.length})</TabsTrigger>
            <TabsTrigger value="interest">Interesses ({interestGroups.length})</TabsTrigger>
            <TabsTrigger value="local">Locais ({localGroups.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredGroups.map(group => (
                  <GroupCard key={group.id} group={group as any} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-ink-500">Você ainda não faz parte de nenhum grupo.</p>
                <Button 
                  className="mt-4"
                  onClick={() => setShowCreateModal(true)}
                >
                  Criar seu primeiro grupo
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="friends">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {friendsGroups.map(group => (
                <GroupCard key={group.id} group={group as any} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interest">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interestGroups.map(group => (
                <GroupCard key={group.id} group={group as any} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="local">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {localGroups.map(group => (
                <GroupCard key={group.id} group={group as any} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateGroupModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </>
  );
}
