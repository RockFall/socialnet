'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Upload, Users } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId?: string;
}

export function CreateEventModal({ isOpen, onClose, groupId }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    locationDetails: ''
  });

  const handleSubmit = () => {
    onClose();
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      locationDetails: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar encontro" size="lg">
      <div className="space-y-4">
        {/* Cover Image */}
        <div className="relative h-32 bg-ink-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-ink-200 transition-colors">
          <div className="text-center">
            <Upload className="w-8 h-8 text-ink-400 mx-auto mb-2" />
            <p className="text-sm text-ink-500">Adicionar foto de capa</p>
          </div>
        </div>

        <Input
          label="Nome do encontro"
          placeholder="Ex: Jantar de sexta, Treino no parque..."
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Data"
            type="date"
            leftIcon={<Calendar className="w-5 h-5" />}
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
          <Input
            label="Horário"
            type="time"
            leftIcon={<Clock className="w-5 h-5" />}
            value={formData.time}
            onChange={e => setFormData({ ...formData, time: e.target.value })}
          />
        </div>

        <Input
          label="Local"
          placeholder="Nome do lugar"
          leftIcon={<MapPin className="w-5 h-5" />}
          value={formData.location}
          onChange={e => setFormData({ ...formData, location: e.target.value })}
        />

        <Input
          label="Endereço (opcional)"
          placeholder="Rua, número, bairro..."
          value={formData.locationDetails}
          onChange={e => setFormData({ ...formData, locationDetails: e.target.value })}
        />

        <Textarea
          label="Descrição (opcional)"
          placeholder="O que vocês vão fazer? O que cada um precisa levar?"
          rows={3}
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />

        <div className="flex gap-3 pt-4">
          <Button variant="outline" fullWidth onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            fullWidth 
            onClick={handleSubmit} 
            disabled={!formData.title || !formData.date || !formData.location}
          >
            Criar encontro
          </Button>
        </div>
      </div>
    </Modal>
  );
}
