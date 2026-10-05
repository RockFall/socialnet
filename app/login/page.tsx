'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao fazer login');
        return;
      }

      router.push('/grupos');
      router.refresh();
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex">
      {/* Left side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-tomato-500 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold">rede</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Um lugar para<br />
            encontrar suas pessoas
          </h1>
          <p className="text-white/80 text-lg">
            Combinar coisas e guardar o que vocês viveram juntos.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">Ana Carolina</p>
              <p className="text-white/70 text-sm">Criou 3 grupos com amigos</p>
            </div>
          </div>
          <p className="text-white/80 italic">
            "Finalmente um lugar onde posso organizar todos os encontros com meus amigos sem perder nenhuma foto ou memória"
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-tomato-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-ink-900">rede</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-2">Bem-vindo de volta</h2>
            <p className="text-ink-500">Entre para continuar conectando com seus grupos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-ink-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-tomato-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-ink-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-tomato-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-tomato-500 text-white font-medium rounded-xl hover:bg-tomato-600 focus:outline-none focus:ring-2 focus:ring-tomato-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-ink-500">
              Não tem uma conta?{' '}
              <Link href="/registro" className="text-tomato-500 font-medium hover:underline">
                Criar conta
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-ink-50 rounded-xl">
            <p className="text-sm text-ink-600 text-center mb-2">
              <strong>Conta demo:</strong>
            </p>
            <p className="text-sm text-ink-500 text-center">
              ana@email.com / senha123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
