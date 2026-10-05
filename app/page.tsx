'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, Calendar, MapPin, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="sticky top-0 bg-cream-100/95 backdrop-blur-sm z-50 border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Link href="/" className="text-ink-600 hover:text-ink-900 font-medium hidden sm:block">
              Sobre
            </Link>
            <Button onClick={() => router.push('/grupos')}>
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-ink-900 mb-6 leading-tight">
              Um lugar para{' '}
              <span className="text-tomato-500">encontrar suas pessoas</span>
            </h1>
            <p className="text-xl text-ink-600 mb-8 max-w-2xl mx-auto">
              Combine coisas, viva experiências e guarde memórias com quem importa. 
              Uma rede para humanos socializarem de verdade.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => router.push('/grupos')}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Começar agora
              </Button>
              <Button variant="outline" size="lg">
                Saiba mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink-900 mb-4">
              O que você pode fazer
            </h2>
            <p className="text-ink-600 max-w-2xl mx-auto">
              Tudo gira em torno de pessoas fazendo coisas juntas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-cream-50 rounded-2xl">
              <div className="w-12 h-12 bg-tomato-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-tomato-600" />
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Grupos</h3>
              <p className="text-sm text-ink-600">
                Reúna seus amigos, encontre pessoas com interesses em comum ou crie grupos do seu bairro.
              </p>
            </div>

            <div className="p-6 bg-cream-50 rounded-2xl">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Ideias</h3>
              <p className="text-sm text-ink-600">
                Sugira atividades, veja quem tem interesse e transforme ideias em encontros reais.
              </p>
            </div>

            <div className="p-6 bg-cream-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Encontros</h3>
              <p className="text-sm text-ink-600">
                Planeje encontros com facilidade e guarde as memórias do que vocês viveram juntos.
              </p>
            </div>

            <div className="p-6 bg-cream-50 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Descoberta</h3>
              <p className="text-sm text-ink-600">
                Encontre grupos de lugares que você frequenta ou pessoas com interesses parecidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink-900 mb-4">
              Como funciona
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-tomato-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Crie ou entre em grupos</h3>
              <p className="text-sm text-ink-600">
                Grupos de amigos, interesses ou lugares que você frequenta.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tomato-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Sugira e combine</h3>
              <p className="text-sm text-ink-600">
                Proponha ideias, veja quem topa e escolham uma data juntos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tomato-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Viva e guarde</h3>
              <p className="text-sm text-ink-600">
                Participem juntos e guardem fotos e memórias do encontro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ink-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Vamos nos encontrar em um lugar.
          </h2>
          <p className="text-ink-300 text-lg mb-8 max-w-2xl mx-auto">
            Conversas, ideias, leitura, comida, passeios, jogos, bairro, cultura. 
            Pessoas reais.
          </p>
          <Button 
            size="lg" 
            onClick={() => router.push('/grupos')}
            className="bg-white text-ink-900 hover:bg-cream-100"
          >
            Entrar na Rede Social
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-cream-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-ink-500">
              Uma rede para humanos socializarem.
            </p>
            <div className="flex items-center gap-4 text-sm text-ink-500">
              <Link href="#" className="hover:text-ink-700">Termos</Link>
              <Link href="#" className="hover:text-ink-700">Privacidade</Link>
              <Link href="#" className="hover:text-ink-700">Contato</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
