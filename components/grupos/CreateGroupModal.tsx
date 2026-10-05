'use client';

import { useState } from 'react';
import { Users, MapPin, Sparkles, CalendarDays, Upload, X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const groupTypes = [
  {
    id: 'friends',
    icon: Users,
    title: 'Amigos',
    description: 'Um grupo para pessoas que já se conhecem'
  },
  {
    id: 'interest',
    icon: Sparkles,
    title: 'Interesse',
    description: 'Reúna pessoas com interesses em comum'
  },
  {
    id: 'local',
    icon: MapPin,
    title: 'Local',
    description: 'Pessoas que frequentam o mesmo lugar'
  },
  {
    id: 'event',
    icon: CalendarDays,
    title: 'Evento',
    description: 'Organize um evento ou viagem'
  }
];

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPrivate: true
  });

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setStep(2);
  };

  const handleSubmit = () => {
    onClose();
    setStep(1);
    setSelectedType(null);
    setFormData({ name: '', description: '', isPrivate: true });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar grupo" size="md">
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-ink-600 mb-4">Que tipo de grupo você quer criar?</p>
          <div className="grid grid-cols-2 gap-3">
            {groupTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center',
                  'hover:border-tomato-500 hover:bg-tomato-50',
                  selectedType === type.id
                    ? 'border-tomato-500 bg-tomato-50'
                    : 'border-ink-100'
                )}
              >
                <div className="w-12 h-12 rounded-full bg-ink-100 flex items-center justify-center">
                  <type.icon className="w-6 h-6 text-ink-600" />
                </div>
                <h3 className="font-medium text-ink-900">{type.title}</h3>
                <p className="text-xs text-ink-500">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <button
            onClick={() => setStep(1)}
            className="text-sm text-ink-500 hover:text-ink-700 mb-2"
          >
            ← Voltar
          </button>

          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <div className="w-full h-full rounded-full bg-ink-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-ink-400" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-tomato-500 text-white rounded-full flex items-center justify-center hover:bg-tomato-600 transition-colors">
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Input
            label="Nome do grupo"
            placeholder="Ex: Amigos da faculdade"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />

          <Textarea
            label="Descrição"
            placeholder="Sobre o que é esse grupo?"
            rows={3}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex items-center justify-between p-3 bg-ink-50 rounded-lg">
            <div>
              <p className="font-medium text-ink-900">Grupo privado</p>
              <p className="text-sm text-ink-500">Apenas convidados podem entrar</p>
            </div>
            <button
              onClick={() => setFormData({ ...formData, isPrivate: !formData.isPrivate })}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative',
                formData.isPrivate ? 'bg-tomato-500' : 'bg-ink-200'
              )}
            >
              <div
                className={cn(
                  'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                  formData.isPrivate ? 'translate-x-6' : 'translate-x-0.5'
                )}
              />
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" fullWidth onClick={onClose}>
              Cancelar
            </Button>
            <Button fullWidth onClick={handleSubmit} disabled={!formData.name}>
              Criar grupo
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
