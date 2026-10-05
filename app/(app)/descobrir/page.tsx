'use client';

import { useState } from 'react';
import { Search, MapPin, Sparkles, Users, TrendingUp, Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { GroupCard } from '@/components/grupos/GroupCard';
import { suggestedGroups, currentUser } from '@/lib/data';

const popularInterests = [
  'Café', 'Corrida', 'Cinema', 'Música', 'Livros', 'Viagens', 
  'Fotografia', 'Gastronomia', 'Yoga', 'Tecnologia', 'Arte', 'Games'
];

const nearbyLocations = [
  { name: 'Café Mocha', type: 'Café', distance: '200m', members: 18 },
  { name: 'Livraria da Vila', type: 'Livraria', distance: '450m', members: 42 },
  { name: 'Parque Villa-Lobos', type: 'Parque', distance: '1.2km', members: 156 },
  { name: 'Academia Smart Fit', type: 'Academia', distance: '300m', members: 89 },
];

export default function DescobrirPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentUser.interests);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen">
      <Header title="Descobrir" />
      
      <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink-900 hidden lg:block">Descobrir</h1>
          <p className="text-ink-500 hidden lg:block">
            Encontre pessoas e grupos que combinam com você
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Buscar grupos, interesses, lugares..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="for-you" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="for-you">Para você</TabsTrigger>
            <TabsTrigger value="interests">Interesses</TabsTrigger>
            <TabsTrigger value="nearby">Perto de você</TabsTrigger>
          </TabsList>

          {/* For You Tab */}
          <TabsContent value="for-you" className="space-y-6">
            {/* Find People Section */}
            <Card padding="lg" className="bg-gradient-to-br from-tomato-50 to-cream-100 border-tomato-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-tomato-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-tomato-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-ink-900 mb-1">
                    Conhecer pessoas novas
                  </h3>
                  <p className="text-sm text-ink-600 mb-4">
                    Encontre um pequeno grupo de pessoas com interesses parecidos com os seus
                  </p>
                  <Button size="sm">
                    Encontrar pessoas
                  </Button>
                </div>
              </div>
            </Card>

            {/* Suggested Groups */}
            <section>
              <CardHeader>
                <div>
                  <CardTitle>Grupos sugeridos</CardTitle>
                  <p className="text-sm text-ink-500">Baseado nos seus interesses</p>
                </div>
              </CardHeader>
              <div className="space-y-4">
                {suggestedGroups.map(group => (
                  <GroupCard key={group.id} group={group} variant="horizontal" showMembers={false} />
                ))}
              </div>
            </section>

            {/* Trending */}
            <section>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-tomato-500" />
                  <CardTitle>Em alta</CardTitle>
                </div>
              </CardHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestedGroups.slice(0, 2).map(group => (
                  <GroupCard key={group.id} group={group} showMembers={false} />
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Interests Tab */}
          <TabsContent value="interests" className="space-y-6">
            <Card padding="lg">
              <h3 className="font-semibold text-ink-900 mb-2">Seus interesses</h3>
              <p className="text-sm text-ink-500 mb-4">
                Selecione para encontrar grupos e pessoas com interesses em comum
              </p>
              <div className="flex flex-wrap gap-2">
                {popularInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-tomato-500 text-white'
                        : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </Card>

            {selectedInterests.length > 0 && (
              <section>
                <CardHeader>
                  <CardTitle>Grupos relacionados</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {suggestedGroups
                    .filter(g => g.interests?.some(i => selectedInterests.includes(i)))
                    .map(group => (
                      <GroupCard key={group.id} group={group} variant="horizontal" showMembers={false} />
                    ))}
                </div>
              </section>
            )}
          </TabsContent>

          {/* Nearby Tab */}
          <TabsContent value="nearby" className="space-y-6">
            <Card padding="lg" className="bg-gradient-to-br from-blue-50 to-cream-100 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-ink-600">Sua localização: Vila Madalena, São Paulo</span>
              </div>
              <p className="text-sm text-ink-500">
                Encontre grupos de lugares que você frequenta
              </p>
            </Card>

            <section>
              <CardHeader>
                <CardTitle>Lugares próximos com grupos</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {nearbyLocations.map((location, i) => (
                  <Card key={i} hover padding="md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-ink-100 rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-ink-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink-900">{location.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-ink-500">
                            <span>{location.type}</span>
                            <span>•</span>
                            <span>{location.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">
                          <Users className="w-3 h-3 mr-1" />
                          {location.members}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <CardHeader>
                <CardTitle>Grupos do bairro</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {suggestedGroups
                  .filter(g => g.type === 'local')
                  .map(group => (
                    <GroupCard key={group.id} group={group} variant="horizontal" showMembers={false} />
                  ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
