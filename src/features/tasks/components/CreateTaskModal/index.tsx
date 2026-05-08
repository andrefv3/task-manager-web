import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Modal, Slider, Input, Button } from '@/shared/components/ui';
import type { Priority } from '@/shared/types';

export const CreateTaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const addTask = useTaskStore((state) => state.addTask);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    impact: 5,
    effort: 5,
    priority: 'MEDIUM' as Priority
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      ...formData,
      status: 'PENDING',
      dueDate: null,
    });
    onClose();
  };

  const priorityScore = (formData.impact / formData.effort).toFixed(2);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Title"
          placeholder="What needs to be done?"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <Input 
          label="Description"
          name="description"
          iconType="description" 
          placeholder="Add some context..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <div className="space-y-8 py-4">
          <Slider 
            label="Impact" 
            min={1} max={10} 
            value={formData.impact}
            onChange={(val: number) => setFormData({ ...formData, impact: val })}
          />
          <Slider 
            label="Effort" 
            min={1} max={10} 
            value={formData.effort}
            onChange={(val: number) => setFormData({ ...formData, effort: val })}
          />
        </div>

        {/* Visual Priority Score */}
        <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-purple-300 text-xs font-bold uppercase">Priority Score</span>
            <span className="text-slate-400 text-xs">Impact / Effort</span>
          </div>
          <span className="text-3xl font-black text-purple-400">{priorityScore}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button 
            variant="ghost" 
            onClick={onClose}
            type="button"
            className="flex-1"
          >
            Cancel
          </Button>
          
          <Button 
            variant="primary"
            type="submit"
            className="flex-1"
          >
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};