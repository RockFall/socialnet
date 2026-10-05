'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface CreateIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
}

export function CreateIdeaModal({ isOpen, onClose, groupId }: CreateIdeaModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = () => {
    onClose();
    setFormData({ title: '', description: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova ideia" size="md">
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        <p className="text-center text-ink-600 mb-4">
          Sugira algo que o grupo pode fazer junto. Se outras pessoas tiverem interesse, vocês podem marcar uma data!
        </p>

        <Input
          label="O que você quer fazer?"
          placeholder="Ex: Fazer canoagem, Ir ao cinema, Jantar no novo restaurante..."
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />

        <Textarea
          label="Mais detalhes (opcional)"
          placeholder="Onde, quando, como..."
          rows={3}
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />

        <div className="flex gap-3 pt-4">
          <Button variant="outline" fullWidth onClick={onClose}>
            Cancelar
          </Button>
          <Button fullWidth onClick={handleSubmit} disabled={!formData.title}>
            Sugerir
          </Button>
        </div>
      </div>
    </Modal>
  );
}
