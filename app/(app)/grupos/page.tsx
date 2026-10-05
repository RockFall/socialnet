'use client';

import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { GroupCard } from '@/components/grupos/GroupCard';
import { CreateGroupModal } from '@/components/grupos/CreateGroupModal';
import { groups, currentUser } from '@/lib/data';

export default function GruposPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const userGroups = groups.filter(g => g.members.some(m => m.user.id === currentUser.id));
  
  const filteredGroups = userGroups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const friendsGroups = filteredGroups.filter(g => g.type === 'friends');
  const interestGroups = filteredGroups.filter(g => g.type === 'interest');
  const localGroups = filteredGroups.filter(g => g.type === 'local');
  const eventGroups = filteredGroups.filter(g => g.type === 'event');

  return (
    <div className="min-h-screen">
      <Header title="Grupos" />
      
      <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink-900 hidden lg:block">Seus Grupos</h1>
            <p className="text-ink-500 hidden lg:block">
              {userGroups.length} {userGroups.length === 1 ? 'grupo' : 'grupos'}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="friends">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {friendsGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interest">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interestGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="local">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {localGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateGroupModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
}
